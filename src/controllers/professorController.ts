import * as express from "express";
import { createProfessor, getProfessors } from '../services/professorService';
import { ProfessorRepository } from "../repository/professorRepository";

const router = express.Router();

/**
   * @openapi
   * /Professor:
   *  post:
   *     tags:
   *     - Professor
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        let professorRepository = new ProfessorRepository();
        const professor = await professorRepository.createProfessor(name);
        res.json(professor); // Retorna o usuário criado

    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o professor", error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        let professorRepository = new ProfessorRepository();
        const professors = await professorRepository.getAllProfessors();
        res.json(professors); // Retorna todos os usuários
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os professores", error: error.message });
    }
});

export default router;
