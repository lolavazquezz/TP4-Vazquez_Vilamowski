import express from "express";
import cors from "cors";
import provincesArray from "./src/entities/province.js"
const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS.
app.use(express.json()); // Middleware para parsear y comprender JSON.

app.get('/api/province', (req, res) => { 
    let resultado = provincesArray;
    res.status(200).send(resultado);
})

app.get('/api/province', (req, res) => { 
    let id = req.params.id;

    res.status(200).send(resultado);
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
