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
import swaggerDocs from "./utils/swagger";
import evaluationController from "./controllers/evaluationController";
import { User } from "./models/user";
import authController from "./controllers/authController";
import courseController from "./controllers/courseController";
import professorsController from "./controllers/professorController";
import classController from "./controllers/classController";
import cors from 'cors';
import {createUser} from "./services/userService";

dotenv.config();
const app = express();

app.use(cors()); // allows all origins

app.use(express.json());

app.use('/auth', authController);
app.use('/api/users', userController);
app.use('/api/evaluations', evaluationController);
app.use('/api/courses',courseController)
app.use('/api/professors', professorsController);
app.use('/api/class/', classController);


// Testando a conexão e inicializando o servidor
sequelize.sync({ force: true }).then(() => {
    console.log("Banco de dados conectado!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

    swaggerDocs(app, 3000);

    seedDb();
}).catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
});

async function seedDb() {
    console.log("Starting Seed");
    let course = await Course.create({ name: "Ciência da Computação" });
    console.log(course);
    let user = await User.create({
        username: "Gledson",
        email: "gledson@gmail.com",
        password: "12345",
        startSemester: "2024.2",
        enrolledCourseId: course.dataValues.id
    });
    console.log(user);
    let newProfessor = await Professor.create({ name: "Glauber" });
    console.log(newProfessor);
    let newClass = await Class.create({ name: "Principios desenvolvimento Web", semester: "2024.2", courseId: course.dataValues.id , professorId: newProfessor.dataValues.id});
    console.log(newClass);
    let newEvaluation = await Evaluation.create({
        userId: user.dataValues.id,
        professorId: newProfessor.dataValues.id,    
        classId: newClass.dataValues.id,
        semester: "2024.2",
        didacticGrade : 4, 
        didacticComment: "Muito bom", 
        evalGrade : 2, 
        evalComment: "péssimo", 
        materialGrade: 5, 
        materialComment : "top de verdade" 

    });

         createUser("GledsonLuan", "gledson@ufcg.edu.br", "gledsonluan", "2024.1", course.dataValues.id);

}

const userRepo = new UserRepository();
