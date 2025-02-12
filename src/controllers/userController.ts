import * as express from "express";
import { createUser, getUsers } from '../services/userService';

const router = express.Router();

router.post('/', createUser);

router.get('/', getUsers);

export default router;


