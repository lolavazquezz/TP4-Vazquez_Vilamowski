import {Router} from "express"
import { StatusCodes } from "http-status-codes";
const router = Router()
const provinciasRouter = () => {


router.put('/id:', async (req, res) =>{
    let id = req.params.id;
    let entidad = req.body;
    const registrosAfectados = await svc.update(id, entidad);
    return res.status(StatusCodes.OK).json(registrosAfectados);
})
router.get("/llamada", (req, res))
}

export default provinciasRouter;