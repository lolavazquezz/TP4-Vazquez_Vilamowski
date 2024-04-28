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
    if (Id == null || !Id || Name == null || !Name || Name.length < 3 || Full_name == null || Full_name.length < 3 || !Full_name || Latitude == null || !Latitude || Longitude == null || !Longitude || Display_order == null || !Display_order) {
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

app.put('/api/province', (req, res) => { 
    let Id = parseInt(req.query.id);
    let newName = ValidacionesHelper.getStringOrDefault(req.query.name, null);
    let newFull_name = ValidacionesHelper.getStringOrDefault(req.query.full_name, null);
    let provinceI = provincesArray.indexOf(p => p.id === Id);
    if (provinceI != -1 ){
        provincesArray[provinceI].name = newName;
        provincesArray[provinceI].full_name = newFull_name;
        res.status(201).send("Provincia modificada satisfactoriamente");
    }
    else if (provinceI == -1) res.status(404).send("No existe una provincia con ese ID");
    else if (newName == null || !newName || newName.length < 3 || newFull_name == null || newFull_name.length < 3){
        res.status(400).send("Faltan campos o son nulos");
    }
})

app.delete('/api/province/:id', (req, res) => {
    const Id = req.params.id;
    let provinceI = provincesArray.indexOf(p => p.id === Id);
    if (provinceI != -1) {
        provincesArray.splice(provinceI, 1);
        res.status(200).send("Provincia eliminada correctamente" );
    }
    else res.status(404).send("No existe una provincia con ese id");
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
