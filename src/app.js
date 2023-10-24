import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { __dirname } from "./utils.js";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productsService } from "./persistence/index.js";

//routers
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { connectDB } from "./config/dbConnection.js";



const port = 8080;
const app = express();



app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const httpServer = app.listen(port,()=>console.log(`Servidor ejecutandose en el puerto ${port}`));

const io = new Server(httpServer);

await connectDB();


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


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


app.use(session({
    store:MongoStore.create({
        ttl:3000,
        mongoUrl:"mongodb+srv://juligiorgi2536:juligiorgi123@codercluser.mab28uy.mongodb.net/primerLogin?retryWrites=true&w=majority&appName=AtlasApp"
    }),
    secret:"secretSessionCoder",
    resave:true,
    saveUninitialized:true
}));

app.use(viewsRouter);
app.use("/api/sessions", sessionsRouter);















