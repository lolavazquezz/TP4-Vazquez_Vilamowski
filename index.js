import express from "express";
import cors from "cors";
import provinciasRouter from "./src/controllers/province-controller.js";
const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS.
app.use(express.json()); // Middleware para parsear y comprender JSON.



app.use("/api/province", provinciasRouter);


app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})