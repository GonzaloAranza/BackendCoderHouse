import { Router } from "express";
import auth from "../middlewares/auth.js";

import { check } from "express-validator";
import inputsValidation from "../middlewares/inputsValidate.js";
import { list, deleteOne, getOne, save, update } from "../controllers/userController.js";


const userRouter = Router();

// router.post('/', [
//     check('firstName', 'El nombre es obligatorio').trim().notEmpty().escape(),
//     check('lastName', 'El apellido es obligatorio').trim().notEmpty().escape(),
//     check('email', 'El email es obligatorio').trim().notEmpty().escape().isEmail(),
//     check('age', "La edad es obligatoria").trim().notEmpty().escape(),
//     check('password', "La password es obligatoria").trim().notEmpty().escape(),
//     inputsValidation
// ], postUser);


userRouter.get('/', list);
userRouter.get('/:id', getOne);
userRouter.post('/', auth, save);
userRouter.put('/:id', update);
userRouter.delete('/:id', deleteOne);


export default userRouter;