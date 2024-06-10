import express, { Router } from "express";
import validate from "../middlewares/input-validation";
import { add, deleteFollow } from "../controllers/followers/controller";
import enforceUser from "../middlewares/enforce-user";

const router = Router();
router.use(enforceUser);

router.post("/", add);
router.delete("/:userId/:vacationId", deleteFollow);

export default router;
