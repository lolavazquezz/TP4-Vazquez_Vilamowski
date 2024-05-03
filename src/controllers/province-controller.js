import {Router} from "express";
import {StatusCodes} from "http-status-codes";
import provincesArray from "../entities/province.js";
import ValidacionesHelper from "../helpers/validaciones-helper.js";
import ProvinceService from './../services/province-service.js';
const router = Router()
const svc = new ProvinceService();

router.get('', async (req, res) => { 
    const returnArray = await svc.getAllAsync();
    res.status(200).send(returnArray);
})

router.get('/:id', async (req, res) => {
    let Id = parseInt(req.params.id);
    const returnArray = await svc.getByIdAsync(Id);
    if (province != null) res.status(200).send(province);
    else res.status(404).send("No existe una provincia con ese ID");
})
        
router.post('', async (req, res) => {
    const Id = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.id), null);
    const Name = ValidacionesHelper.getStringOrDefault(req.query.name, null);
    const Full_name = ValidacionesHelper.getStringOrDefault(req.query.full_name, null);
    const Latitude = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.latitude), null);
    const Longitude = ValidacionesHelper.getIntegerOrDefault(parseInt(req.query.longitude), null);
    const Display_order = ValidacionesHelper.getIntegerOrDefault(req.query.display_order, null);
    if (Id == null || !Id || Name == null || !Name || Name.length < 3 || Full_name == null || Full_name.length < 3 || !Full_name || Latitude == null || !Latitude || Longitude == null || !Longitude || Display_order == null || !Display_order) {
        res.status(400).send("Faltan campos o son nulos");
    }
    else {
        let newProvince = {
            id: Id, 
            name: Name, 
            full_name: Full_name, 
            latitude: Latitude, 
            longitude: Longitude, 
            display_order: Display_order
        }
        provincesArray.push(newProvince);
        res.status(201).send("Provincia creada satisfactoriamente");
    }    
})
        
router.put('', async (req, res) => { 
    let Id = parseInt(req.query.id);
    let newName = ValidacionesHelper.getStringOrDefault(req.query.name, null);
    let newFull_name = ValidacionesHelper.getStringOrDefault(req.query.full_name, null);
    let provinceI = provincesArray.findIndex(p => p.id === Id);
    if (provinceI != -1 ){
        provincesArray[provinceI].name = newName;
        provincesArray[provinceI].full_name = newFull_name;
        res.status(201).send("La provincia " + provincesArray[provinceI].full_name + " fue modificada satisfactoriamente ");
    }
    else if (provinceI == -1) res.status(404).send("No existe una provincia con ese ID");
    else if (newName == null || !newName || newName.length < 3 || newFull_name == null || newFull_name.length < 3){
        res.status(400).send("Faltan campos o son nulos");
    }
})
        
router.delete('/:id', async (req, res) => {
    let Id = parseInt(req.params.id);
    let provinceI = provincesArray.findIndex(p => p.id === Id);
    if (provinceI != -1) {
        provincesArray.splice(provinceI, 1);
        res.status(200).send("Provincia eliminada correctamente" );
    }
    else res.status(404).send("No existe una provincia con ese id");
})

router.put('/id:', async (req, res) =>{
    let id = req.params.id;
    let entidad = req.body;
    const registrosAfectados = await svc.update(id, entidad);
    return res.status(StatusCodes.OK).json(registrosAfectados);
})

export default router;