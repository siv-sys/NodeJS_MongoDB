import express from 'express';
import { createUser, getUsers } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);

export default userRouter;