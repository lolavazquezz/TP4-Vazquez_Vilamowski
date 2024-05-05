import {Router} from "express";
import {StatusCodes} from "http-status-codes";
import provincesArray from "../entities/province.js";
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
    if (returnArray != null) res.status(200).send(returnArray);
    else res.status(404).send("No existe una provincia con ese ID");
})
        
router.post('', async (req, res) => {
    let entity = req.body;
    let mensaje = await svc.createAsync(entity);
    if (!mensaje){
        return res.status(400).send("Faltan campos o son nulos");
    }
    else{
        return res.status(201).send("Provincia creada satisfactoriamente");
    }
})
        
router.put('', async (req, res) => { 
    let id = parseInt(req.query.id);
    let entity = req.body;
    let mensaje = await svc.updateAsync(entity, id);
    if (mensaje == 201){
        res.status(201).send("La provincia fue modificada satisfactoriamente")
    }
    else if (mensaje == 400) {
        res.status(400).send("El nombre no puede tener menos de 3 caracteres");
    }
    else {
        res.status(404).send("No existe una provincia con ese ID")
    }

})
        
router.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let mensaje = await svc.deleteByIdAsync(id);
    if (mensaje) {
        res.status(200).send("Provincia eliminada correctamente" );
    }
    else res.status(404).send("No existe una provincia con ese id");
})

export default router;