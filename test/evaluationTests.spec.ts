import { afterEach, beforeEach, describe } from "mocha";

import { Evaluation } from "../src/models/evaluation";
import { EvaluationRepository } from "../src/repository/evaluationRepository";
import { EvaluationService } from "../src/services/evaluationService";
import { expect } from "chai";
import { UserRepository } from "../src/repository/userRepository";
import { User } from "../src/models/user";
import { CourseRepository } from "../src/repository/courseRepository";
import { ClassRepository } from "../src/repository/classRepository";
import Course from "../src/models/course";
import { ProfessorRepository } from "../src/repository/professorRepository";
import Professor from "../src/models/professor";
import { Class } from "../src/models/class";


describe('Testes de repositório Evaluation', function () {

    let evaluationRepository: EvaluationRepository;
    let user: User;
    let course: Course;
    let professor: Professor;
    let classroom: Class;

    let user2: User;
    let course2: Course;
    let professor2: Professor;
    let classroom2: Class;


    before(async function () {
        evaluationRepository = new EvaluationRepository();
        let userRepository = new UserRepository();
        let courserRepository = new CourseRepository();
        let classRepository = new ClassRepository();
        let professorRepository = new ProfessorRepository();

        professor = await professorRepository.createProfessor("teste");
        professor2 = await professorRepository.createProfessor("teste2");

        course = await courserRepository.createCourse("teste");
        course2 = await courserRepository.createCourse("teste2");

        user = await userRepository.createUser("teste", "teste@teste.com", "teste", "2023.1", course.dataValues.id);
        user2 = await userRepository.createUser("teste2", "teste2@teste.com", "teste2", "2023.1", course2.dataValues.id);

        classroom = await classRepository.createClass("teste", "teste", course.dataValues.id, professor.dataValues.id);
        classroom2 = await classRepository.createClass("teste2", "teste2", course2.dataValues.id, professor2.dataValues.id);

    });

    afterEach(async function () {
        await evaluationRepository.deleteAllEvaluations();
    });

    beforeEach(async function () {
        await evaluationRepository.deleteAllEvaluations();
    });


    it('deve criar uma nova avaliação', async function () {
        const evaluationData = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationRepository.createEvaluation(evaluationData);
        expect(evaluation.dataValues).to.have.property('userId', user.dataValues.id);
        expect(evaluation.dataValues).to.have.property('professorId', professor.dataValues.id);
        expect(evaluation.dataValues).to.have.property('classId', classroom.dataValues.id);
        expect(evaluation.dataValues).to.have.property('semester', '2023.1');
    });

    it('deve retornar todas as avaliações', async function () {
        const evaluationData1 = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluationData2 = {
            userId: user2.dataValues.id,
            professorId: professor2.dataValues.id,
            classId: classroom2.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        await evaluationRepository.createEvaluation(evaluationData1);
        await evaluationRepository.createEvaluation(evaluationData2);

        const evaluations = await evaluationRepository.getAllEvaluations();
        expect(evaluations).to.have.lengthOf(2);
    });

    it('deve retornar uma avaliação pelo id', async function () {
        const evaluationData = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const createdEvaluation = await evaluationRepository.createEvaluation(evaluationData);
        const evaluation = await evaluationRepository.getEvaluationById(createdEvaluation.dataValues.id);
        expect(evaluation?.dataValues).to.have.property('userId', user.dataValues.id);
        expect(evaluation?.dataValues).to.have.property('professorId', professor.dataValues.id);
        expect(evaluation?.dataValues).to.have.property('classId', classroom.dataValues.id);
        expect(evaluation?.dataValues).to.have.property('semester', '2023.1');
    });

    it('deve atualizar uma avaliação', async function () {
        const evaluationData = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationRepository.createEvaluation(evaluationData);
        const updatedEvaluation = await evaluationRepository.updateEvaluation(evaluation.dataValues.id, { semester: '2023.2' });
        expect(updatedEvaluation?.dataValues).to.have.property('semester', '2023.2');
    });

    it('deve deletar uma avaliação', async function () {
        const evaluationData = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationRepository.createEvaluation(evaluationData);
        await evaluationRepository.deleteEvaluation(evaluation.dataValues.id);
        const evaluations = await evaluationRepository.getAllEvaluations();
        expect(evaluations).to.have.lengthOf(0);
    });
});

describe('Testes de service Evaluation', function () {

    let evaluationService: EvaluationService;
    let user: User;
    let course: Course;
    let professor: Professor;
    let classroom: Class;

    let user2: User;
    let course2: Course;
    let professor2: Professor;
    let classroom2: Class;


    before(async function () {
        let evaluationRepository = new EvaluationRepository();
        let userRepository = new UserRepository();
        let courserRepository = new CourseRepository();
        let classRepository = new ClassRepository();
        let professorRepository = new ProfessorRepository();

        professor = await professorRepository.createProfessor("teste");
        professor2 = await professorRepository.createProfessor("teste2");

        course = await courserRepository.createCourse("teste");
        course2 = await courserRepository.createCourse("teste2");

        user = await userRepository.createUser("teste", "teste@teste.com", "teste", "2023.1", course.dataValues.id);
        user2 = await userRepository.createUser("teste2", "teste2@teste.com", "teste2", "2023.1", course2.dataValues.id);

        classroom = await classRepository.createClass("teste", "teste", course.dataValues.id, professor.dataValues.id);
        classroom2 = await classRepository.createClass("teste2", "teste2", course2.dataValues.id, professor2.dataValues.id);

        evaluationService = new EvaluationService(evaluationRepository);

    });
    it('deve criar uma nova avaliação', async function () {
        const evaluationData = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationService.createEvaluation(evaluationData);
        expect(evaluation).to.have.property('userId', user.dataValues.id)
        expect(evaluation).to.have.property('professorId', professor.dataValues.id);
        expect(evaluation).to.have.property('classId', classroom.dataValues.id);
        expect(evaluation).to.have.property('semester', '2023.1');
    });

    it('deve retornar todas as avaliações', async function () {
        const evaluationData1 = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluationData2 = {
            userId: user2.dataValues.id,
            professorId: professor2.dataValues.id,
            classId: classroom2.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        await evaluationService.createEvaluation(evaluationData1);
        await evaluationService.createEvaluation(evaluationData2);

        const evaluations = await evaluationService.getAllEvaluations();
        expect(evaluations).to.have.lengthOf(2);
    });

    it('deve retornar uma avaliação pelo id', async function () {
        const evaluationData = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const createdEvaluation = await evaluationService.createEvaluation(evaluationData);
        const evaluation = await evaluationService.getEvaluationById(createdEvaluation.id);
        expect(evaluation).to.have.property('userId', user.dataValues.id);
        expect(evaluation).to.have.property('professorId', professor.dataValues.id);
        expect(evaluation).to.have.property('classId', classroom.dataValues.id);
        expect(evaluation).to.have.property('semester', '2023.1');
    });

    it('deve atualizar uma avaliação', async function () {
        const evaluationData = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationService.createEvaluation(evaluationData);
        const updatedEvaluation = await evaluationService.updateEvaluation(evaluation.dataValues.id, { semester: '2023.2' });
        expect(updatedEvaluation?.dataValues).to.have.property('semester', '2023.2');
    });

    it('deve deletar uma avaliação', async function () {
        const evaluationData = {
            userId: user.dataValues.id,
            professorId: professor.dataValues.id,
            classId: classroom.dataValues.id,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationService.createEvaluation(evaluationData);
        await evaluationService.deleteEvaluation(evaluation.dataValues.id);
        const evaluations = await evaluationService.getAllEvaluations();
        expect(evaluations).to.have.lengthOf(0);
    });
});
