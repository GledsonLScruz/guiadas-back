import * as express from "express";
import { createCourse, getCourses,deleteCourse } from "../services/courseService";

const router = express.Router();

/**
   * @openapi
   * /Course:
   *  post:
   *     tags:
   *     - Course
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */

// Creates a new instance of a Course, and returns it to its creator
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const course = await createCourse(name);
        res.json(course); // Returns the created course

    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar a disciplina", error: error.message });
    }
});

// Returns all instances of Course entities registered in the system
router.get('/', async (req, res) => {
    try {
        const courses = await getCourses();
        res.json(courses); // Returns all courses
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter as disciplinas", error: error.message });
    }
});

// Deletes a Course based on its id or name
router.delete('/', async (req, res) => {
    try{
        await deleteCourse(req.body);
    } catch (error: any) {({ message: "Erro ao apagar a disciplina", error: error.message });
        res.status(500).json
    }
});

export default router;
