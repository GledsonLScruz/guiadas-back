import * as express from "express";
import { createUser, getUsers } from '../services/userService';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, email, password, startSemester, enrolledCourseId } = req.body;

        if (!username || !email || !password || !startSemester || !enrolledCourseId) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const user = await userRepo.createUser(username, email, password);
        res.json(user); // Retorna o usuário criado
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await userRepo.getAllUsers();
        res.json(users); // Retorna todos os usuários
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
});

export default router;


