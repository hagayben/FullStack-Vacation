import { Router } from "express";
import {
  add,
  deleteVacation,
  getOne,
  getAll,
  update,
  sendCSV,
  graph,
} from "../controllers/vacations/controller";
import enforceAdmin from "../middlewares/enforce-admin";
import uploadImage from "../middlewares/upload-image";
import addImageToBody from "../middlewares/add-image-to-body";
import validate from "../middlewares/input-validation";
import { addVacationValidator, patchVacationValidator } from "../controllers/vacations/validator";

const router = Router();

// /?page=3&onlyUser=true&onlyActive=true&notStarted=false
router.get("/csv", sendCSV);
router.get("/", getAll);
router.get("/vacation-report", graph);

router.get("/:id", enforceAdmin,getOne);
router.post("/",addImageToBody,validate(addVacationValidator), uploadImage,add);
router.patch("/:id",addImageToBody,enforceAdmin,validate(patchVacationValidator), uploadImage,update);
router.delete("/:id", enforceAdmin,deleteVacation);

export default router;
