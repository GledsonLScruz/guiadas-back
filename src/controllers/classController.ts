import * as express from "express";
import { createClass, deleteClass, getClasses, getClassesByProfessorId } from '../services/classService';
import { authenticate } from "../middlewares/authMiddleWare";

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
router.post('/', authenticate, async (req, res) => {
    try {
        const { name, semester, courseId, professorId } = req.body;

        if (!name || !semester || !courseId || !professorId) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
            return;
        }

        const pclass = await createClass(name, semester, courseId,professorId);
        res.json(pclass); // Returns the created Class entity

    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar a classe", error: error.message });
    }
});

// Returns all Class entities registered in the database
router.get('/', authenticate, async (req, res) => {
    try {
        const classes = await getClasses();
        res.json(classes); // Returns all class entities
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter as classes", error: error.message });
    }
});

// Returns all Class for a professor 
router.get('/:id', authenticate, async (req, res) => {
    try {
        const classes = await getClassesByProfessorId(Number(req.params.id));
        res.json(classes); // Returns all class entities
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter as classes", error: error.message });
    }
});

// Deletes a Class entity by its id
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        await deleteClass(Number(id));
        res.json({ message: "Classe deletada com sucesso." });
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao deletar a classe", error: error.message });
    }
});

export default router;
