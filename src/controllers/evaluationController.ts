
import express from "express";
import { EvaluationService } from "../services/evaluationService";
import { EvaluationRepository } from "../repository/evaluationRepository";

const router = express.Router();

let evaluationRepository = new EvaluationRepository();
let evaluationService = new EvaluationService(evaluationRepository);

/**
 * @openapi
 * /Evaluation:
 *   post:
 *     tags:
 *       - Evaluation
 *     description: Cria uma nova avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               professorId:
 *                 type: integer
 *               classId:
 *                 type: integer
 *               semester:
 *                 type: string
 *             required:
 *               - userId
 *               - professorId
 *               - classId
 *               - semester
 *     responses:
 *       200:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Campos obrigatórios não informados ou inválidos
 *       500:
 *         description: Erro ao criar avaliação
 */
router.post("/", async (req, res) => {
    try {
        const { userId, professorId, classId, semester, didacticGrade, didacticComment, evalGrade, evalComment, materialGrade, materialComment } = req.body;
        if (!userId || !professorId || !classId || !semester) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        const evaluation = await evaluationService.createEvaluation({userId, professorId, classId, semester, didacticGrade, didacticComment, evalGrade, evalComment, materialGrade, materialComment });

        res.json(evaluation);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar avaliação", error: error.message });
    }
});

/**
 * @openapi
 * /Evaluation:
 *   get:
 *     tags:
 *       - Evaluation
 *     description: Retorna todas as avaliações
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *       500:
 *         description: Erro ao obter avaliações
 */
router.get("/", async (req, res) => {
    try {
        const evaluations = await evaluationService.getAllEvaluations();
        res.json(evaluations);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter avaliações", error: error.message });
    }
});

/**
 * @openapi
 * /Evaluation/{id}:
 *   get:
 *     tags:
 *       - Evaluation
 *     description: Retorna uma avaliação pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Dados da avaliação
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao obter avaliação
 */
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const evaluation = await evaluationService.getEvaluationById(Number(id));
        if (!evaluation) {
            res.status(404).json({ message: "Avaliação não encontrada" });
        }
        res.json(evaluation);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter avaliação", error: error.message });
    }
});


router.get("/view/:professorId/:classId", async (req, res) => {
    try {
        const { professorId, classId } = req.params;
        const evaluation = await evaluationService.getEvaluationByProfessorAndClass(Number(professorId), Number(classId));
        if (!evaluation) {
            res.status(404).json({ message: "Avaliação não encontrada" });
        }
        res.json(evaluation);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter avaliação", error: error.message });
    }
});

/**
 * @openapi
 * /Evaluation/{id}:
 *   put:
 *     tags:
 *       - Evaluation
 *     description: Atualiza uma avaliação existente
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               professorId:
 *                 type: integer
 *               classId:
 *                 type: integer
 *               semester:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       400:
 *         description: Campos obrigatórios não informados ou inválidos
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao atualizar avaliação
 */
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, professorId, classId, semester } = req.body;
        if (!userId || !professorId || !classId || !semester) {
            res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }
        const updatedEvaluation = await evaluationService.updateEvaluation(Number(id), { userId, professorId, classId, semester });
        if (!updatedEvaluation) {
            res.status(404).json({ message: "Avaliação não encontrada" });
        }
        res.json(updatedEvaluation);
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao atualizar avaliação", error: error.message });
    }
});

/**
 * @openapi
 * /Evaluation/{id}:
 *   delete:
 *     tags:
 *       - Evaluation
 *     description: Exclui uma avaliação
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação deletada com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro ao deletar avaliação
 */
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await evaluationService.deleteEvaluation(Number(id));
        if (!result) {
            res.status(404).json({ message: "Avaliação não encontrada" });
        }
        res.json({ message: "Avaliação deletada com sucesso." });
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao deletar avaliação", error: error.message });
    }
});

export default router;
