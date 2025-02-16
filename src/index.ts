import express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { UserRepository } from "./repository/userRepository";
import { Course } from './models/course';
import { Criteria } from './models/criteria';
import { Class } from './models/class';
import { Evaluation } from "./models/evaluation";
import Professor from "./models/professor";
import userController from './controllers/userController';

dotenv.config();
const app = express();
app.use(express.json());


app.use('/api/Users', userController);


// Testando a conexão e inicializando o servidor
sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    seedDb();
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});

async function seedDb() {
    let course = await Course.create({ name: "Ciência da Computação" });
    let newClass = await Class.create({ name: "Principios desenvolvimento Web", semester: "2024.2", courseId: course.id });
    let newProfessor = await Professor.create({ name: "Dalton" });
}

const userRepo = new UserRepository();
