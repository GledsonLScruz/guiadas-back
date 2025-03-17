import * as express from "express";
import { createProfessor, getProfessors, deleteProfessor } from "../services/professorService";

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

// Creates a new instance of a Professor, and returns it to its creator
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const professor = await createProfessor(name);
        res.json(professor); // Returns the created professor

    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o professor", error: error.message });
    }
});

// Returns all instances of Professor entities registered in the system
router.get('/', async (req, res) => {
    try {
        const professors = await getProfessors();
        res.json(professors); // Returns all professors
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os professores", error: error.message });
    }
});

// Deletes a Professor by id
router.delete('/:id', async (req, res) => {
    try {
        await deleteProfessor(req.body);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao apagar o professor", error: error.message });
    }
});

export default router;
