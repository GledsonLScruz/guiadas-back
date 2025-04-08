import * as express from "express";
import { ProfessorRepository } from "../repository/professorRepository";

const router = express.Router();

let professorRepository = new ProfessorRepository();

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

// Creates a new instance of a Professor, and returns it to its creator
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        if (name.trim().length == 0 || name === null) {
            res.status(400).json({ message: "Nome inválido" });
        }

        let professorRepository = new ProfessorRepository();
        const professor = await professorRepository.createProfessor(name);
        res.json(professor); // Retorna o usuário criado

    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o professor", error: error.message });
    }
});

// Returns all instances of Professor entities registered in the system
router.get('/', async (req, res) => {
    try {
        const professors = await professorRepository.getAllProfessors();
        res.json(professors); // Returns all professors
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os professores", error: error.message });
    }
});

// Returns a professor by an id
router.get('/:id', async (req, res) => {
    try {
        const professors = await professorRepository.getProfessorById(parseInt(req.params.id));
        res.json(professors); // Returns all professors
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os professores", error: error.message });
    }
});


// Deletes a Professor by id
router.delete('/:id', async (req, res) => {
    try {
        await professorRepository.deleteProfessor(req.body);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao apagar o professor", error: error.message });
    }
});

export default router;
