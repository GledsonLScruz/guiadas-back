import * as express from "express";
import { createClass, deleteClass, getClasses } from '../services/classService';

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

        const pclass = await createClass(name, semester, courseId);
        res.json(pclass); // Returns the created Class entity

    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar a classe", error: error.message });
    }
});

// Returns all Class entities registered in the database
router.get('/', async (req, res) => {
    try {
        const classes = await getClasses();
        res.json(classes); // Returns all class entities
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter as classes", error: error.message });
    }
});

// Deletes a Class entity by its id
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await deleteClass(Number(id));
      res.json({ message: "Classe deletada com sucesso." });
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao deletar a classe", error: error.message });
    }
});

export default router;
