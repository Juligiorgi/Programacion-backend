import express from "express";
import session from "express-session";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { chatService, productsService } from "./dao/index.js";
import { initializePassport } from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { config } from "./config/config.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./helpers/logger.js";
import { swaggerSpecs } from "./config/swagger.config.js";
import  SwaggerUI from "swagger-ui-express";


//routers
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { connectDB } from "./config/dbConnection.js";
import {usersRoutes} from "./routes/users.routes.js";



const port = 8080;
const app = express();



app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

const httpServer = app.listen(port,()=>logger.info(`Servidor ejecutandose en el puerto ${port}`));



await connectDB();

app.use(viewsRouter);

app.use(cookieParser("claveCookies"));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.use("/api/sessions", sessionsRouter);

app.use("/api/users", usersRoutes);

app.use("/api/docs", SwaggerUI.serve, SwaggerUI.setup(swaggerSpecs));

app.use(errorHandler);



app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}));

app.use(session({
  store: MongoStore.create({
      ttl:3000,
      mongoUrl:config.mongo.url,
  }),
  secret:config.server.secretSession,
  resave:true,
  saveUninitialized:true
}));

//logger

app.get("/", (req,res)=>{
  logger.debug("Este es un mensaje de debug");
  logger.http("Este es un mensaje http");
  logger.warn("Este es un mensaje de advertencia");
  logger.error("Este es un mensaje de error");
  res.send("Peticion recibida");
});


//config passport

initializePassport();
app.use(passport.initialize());


//configuracion 
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));


const io = new Server(httpServer);

//chat
io.on("connection", async(socket)=>{
  let chat = await chatService.getMessages() ;
  socket.emit("chatHistory", chat);

  socket.on("msgChat", (data)=>{
      chat.push(data);
      io.emit("chatHistory", chat)
  });

  socket.on("msgChat", async (data) => {
      if (data.message.trim() !== "") {
        await chatService.addMessage(data);
        io.emit("chatHistory", chat);
      }
    });

  socket.on("authenticated", (data)=>{
      socket.broadcast.emit("newUser",`El usuario ${data} se acaba de conectar`);
  })
});


io.on("connection", async (socket)=>{
    console.log("cliente conectado");
    const products = await productsService.getProducts();
    socket.emit("products", products);

    socket.on("addProducts", async(productsData)=>{
        try {
            const productToSave = {
              title: productsData.title,
              description: productsData.description,
              price: productsData.price,
              code: productsData.code,
              stock: productsData.stock,
              status: productsData.status,
              category: productsData.category,
              thumbnail: productsData.thumbnail,
            };
            await productsService.addProduct(productToSave);
    
            const updatedProducts = await productsService.getProducts();
            io.emit("products", updatedProducts);
          } catch (error) {
            console.log(error);
          }
    });

    socket.on("deleteProduct", async (id) =>{
        try {
            await productsService.deleteProduct(id);
            const updatedProducts = await productsService.getProducts();
    
            socket.emit("products", updatedProducts);
          } catch (error) {
            console.log(error);
          }
        });
    
});



















