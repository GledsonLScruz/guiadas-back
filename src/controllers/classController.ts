import * as express from "express";
import { createClass, getClasses } from '../services/classService';
import { ClassRepository } from "../repository/classRepository";

const router = express.Router();

/**
   * @openapi
   * /Class:
   *  post:
   *     tags:
   *     - Class
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */

// Creates a new instance of a Class entity, and returns it to its creator
router.post('/', async (req, res) => {
    try {
        const { name, semester, courseId } = req.body;

        if (!name || !semester || !courseId) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        let classRepository = new ClassRepository();
        const pclass = await classRepository.createClass(name, semester, courseId);
        res.json(pclass); // Retorna o usuário criado

    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar a classe", error: error.message });
    }
});

// Returns all Class entities registered in the database
router.get('/', async (req, res) => {
    try {
        let classRepository = new ClassRepository();
        const classes = await classRepository.getAllClasses();
        res.json(classes); // Retorna todos os usuários
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter as classes", error: error.message });
    }
});

export default router;
