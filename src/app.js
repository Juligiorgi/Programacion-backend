import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productsService } from "./persistence/index.js";
import { initPassport } from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";

//routers
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { connectDB } from "./config/dbConnection.js";
import { config } from "./config/config.js";




const port = 8080;
const app = express();



app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const httpServer = app.listen(PORT,()=>console.log(`Servidor ejecutandose en el puerto ${PORT}`));

const io = new Server(httpServer);

await connectDB();

app.use(viewsRouter);

app.use(cookieParser("claveCookies"));

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended:true}));


//configuracion 
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));


io.on("connection", async (socket)=>{
    console.log("cliente conectado");
    const products = await productsService.getProducts();
    socket.emit("productsArray", products);

    socket.on("addProducts", async(productsData)=>{
     const result = await productsService.createProduct(productsData)
     const products = await productsService.getProducts();
     io.emit("productsArray", products);
    });

    socket.on("deleteProduct", async (deleteId) =>{
        const newProducts = await productsService.deleteProduct(deleteId);
        const products = await productsService.getProducts(newProducts);
        io.emit ("productsArray" , products);
    });
});



//config passport
initPassport();
app.use(passport.initialize());



app.use("/api/sessions", sessionsRouter);















