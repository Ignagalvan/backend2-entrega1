import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongo conectado");
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.log("Error Mongo:", error);
    });