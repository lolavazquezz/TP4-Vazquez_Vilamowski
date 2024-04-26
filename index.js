import express from "express";
import cors from "cors";
import provincesArray from "./src/entities/province.js"
import ValidacionesHelper from "./src/helpers/validaciones-helper.js";
const app = express();
const port = 3000; // El puerto 3000 (http://localhost:3000)
// Agrego los Middlewares
app.use(cors()); // Middleware de CORS.
app.use(express.json()); // Middleware para parsear y comprender JSON.

app.get('/api/province', (req, res) => { 
    let resultado = provincesArray;
    res.status(200).send(resultado);
})

app.get('/api/province/:id', (req, res) => { 
    let Id = parseInt(req.params.id);
    let province = provincesArray.find(p => p.id === Id);
    if (province != null) res.status(200).send(province);
    else res.status(404).send("No existe una provincia con ese ID");
})

app.post('/api/province', (req, res) => {
    const Id = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.id), null);
    const Name = ValidacionesHelper.getStringOrDefault(req.query.name, null);
    const Full_name = ValidacionesHelper.getStringOrDefault(req.query.full_name, null);
    const Latitude = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.latitude), null);
    const Longitude = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.longitude), null);
    const Display_order = ValidacionesHelper.getIntegerOrDefault(req.query.display_order, null);
    if (Id == null || Name == null || Full_name == null || Latitude == null || Longitude == null || Display_order == null) {
        res.status(400).send("Faltan campos o son nulos");
        }
        //SIEMPRE DEVUELVE NULL
    else {
        provincesArray.push(new {
            id: Id, 
            name: Name, 
            full_name: Full_name, 
            latitude: Latitude, 
            longitude: Longitude, 
            display_order: Display_order
        });
        res.status(201).send("Provincia creada satisfactoriamente");
    }    
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
