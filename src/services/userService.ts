import { UserRepository } from "../repository/userRepository";


const userRepo = new UserRepository();

export const getUsers = async (req, res) => {
    try {
        const users = await userRepo.getAllUsers();
        res.json(users); // Retorna todos os usuários
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao obter os usuários", error: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userRepo.createUser(name, email, password);
        res.json(user); // Retorna o usuário criado
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar o usuário", error: error.message });
    }
}




