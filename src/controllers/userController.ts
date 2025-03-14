import express from "express";
import {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
} from "../services/userService";

const router = express.Router();

/**
   * @openapi
   * /User:
   *  post:
   *     tags:
   *     - User
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
router.post("/", async (req, res) => {
    try {
      const { username, email, password, startSemester, enrolledCourseId } = req.body;

      if (!username || !email || !password || !startSemester || !enrolledCourseId) {
         res.status(400).json({ message: "Todos os campos são obrigatórios" });
      }

      if (username.trim().length == 0 || username === null) {
        res.status(400).json({message: "Nome de usuário não pode ser vazio ou em branco"});
      }

      const emailPattern = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;
      
      if (!emailPattern.test(email) && !email.includes("ufcg.edu.br")) {
        res.status(400).json({message: "Email fornecido não é válido ou não é email institucional da UFCG"});
      }

      if (password.trim().length == 0 || password.trim().length < 6 || password === null){
        res.status(400).json({message: "Senha inválida"});
      }

      if (startSemester.trim().length == 0 || startSemester.trim().length < 6 || startSemester === null){
        res.status(400).json({message: "Semestre de admissão inválido"});
      }

      if (enrolledCourseId < 100 || enrolledCourseId >= 800){
        res.status(400).json({message: "Identificador de curso inválido"});
      }

      const user = await createUser(username, email, password, startSemester, enrolledCourseId);
      res.json(user); // Retorna o usuário criado
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
      const users = await getUsers();
      res.json(users); // Retorna todos os usuários
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
});

/**
   * @openapi
   * /User/{id}:
   *  put:
   *    tags:
   *      - User
   *    description: Atualiza um usuário existente
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: ID do usuário
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              username:
   *                type: string
   *              email:
   *                type: string
   *              password:
   *                type: string
   *              startSemester:
   *                type: string
   *              enrolledCourseId:
   *                type: integer
   *    responses:
   *      200:
   *        description: Usuário atualizado com sucesso
   *      400:
   *        description: Dados inválidos
   *      500:
   *        description: Erro ao atualizar o usuário
   */
router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email, password, startSemester, enrolledCourseId } = req.body;

      if (!username || !email || !password || !startSemester || !enrolledCourseId) {
         res.status(400).json({ message: "Todos os campos são obrigatórios" });
      }

      const updatedUser = await updateUser(
        Number(id),
        username,
        email,
        password,
        startSemester,
        enrolledCourseId
      );
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao atualizar o usuário", error: error.message });
    }
});

/**
   * @openapi
   * /User/{id}:
   *  delete:
   *    tags:
   *      - User
   *    description: Exclui um usuário
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: integer
   *        required: true
   *        description: ID do usuário
   *    responses:
   *      200:
   *        description: Usuário excluído com sucesso
   *      500:
   *        description: Erro ao excluir o usuário
   */
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await deleteUser(Number(id));
      res.json({ message: "Usuário deletado com sucesso." });
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao deletar o usuário", error: error.message });
    }
});

export default router;
