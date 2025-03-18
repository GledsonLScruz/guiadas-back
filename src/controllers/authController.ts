import * as express from "express";
import { comparePassword, generateToken } from '../utils/auth';
import { findUserByUsername } from '../services/userService';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Verifica se o usuário existe
        const user = await findUserByUsername(username);
        if (!user) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }
        // Compara a senha fornecida com a senha armazenada
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid username or password' });
            return;
        }
        // Gera um token JWT
        const token = generateToken(user.id, user.username);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err });
    }
});

export default router;