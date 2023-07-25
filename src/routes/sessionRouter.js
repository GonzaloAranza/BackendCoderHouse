import { Router } from "express";
import { check } from "express-validator";
import inputsValidation from "../middlewares/inputsValidate.js";
import { login, logout, signup } from "../controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.post('/logout', logout);
sessionRouter.post('/signup', signup);

export default sessionRouter;