import mongoose from "mongoose";
import { config } from "./config.js";
import { logger } from "../helpers/logger.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.url);
        logger.info("Base de datos conectada");
    } catch (error) {
        logger.error(`hubo un error conectando la base de datos: ${error.message}`);
    }
};
