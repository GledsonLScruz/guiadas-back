import * as express from "express";
import { createUser, getUsers } from '../services/userService';
import { UserRepository } from "../repository/userRepository";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, email, password, startSemester, enrolledCourseId } = req.body;

        if (!username || !email || !password || !startSemester || !enrolledCourseId) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        let userRepository = new UserRepository();
        const user = await  userRepository.createUser(username, email, password,startSemester,enrolledCourseId);
        res.json(user); // Retorna o usuário criado
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        let userRepository = new UserRepository();
        const users = await userRepository.getAllUsers();
        res.json(users); // Retorna todos os usuários
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
});

export default router;


