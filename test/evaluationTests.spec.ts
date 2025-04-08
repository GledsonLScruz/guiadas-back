import { afterEach, beforeEach, describe } from "mocha";

import { Evaluation } from "../src/models/evaluation";
import { EvaluationRepository } from "../src/repository/evaluationRepository";
import { EvaluationService } from "../src/services/evaluationService";
import { expect } from "chai";


describe('Testes de repositório', function () {

    let evaluationRepository: EvaluationRepository;

    beforeEach(function () {
        evaluationRepository = new EvaluationRepository();
    });

    afterEach(function () {
        evaluationRepository.deleteAllEvaluations();
    });

    it('deve criar uma nova avaliação', async function () {
        const evaluationData = {
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationRepository.createEvaluation(evaluationData);
        expect(evaluation).to.have.property('userId', 1);
        expect(evaluation).to.have.property('professorId', 1);
        expect(evaluation).to.have.property('classId', 1);
        expect(evaluation).to.have.property('semester', '2023.1');
    });

    it('deve retornar todas as avaliações', async function () {
        const evaluationData1 = {
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluationData2 = {
            userId: 2,
            professorId: 1,
            classId: 1,
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
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const createdEvaluation = await evaluationRepository.createEvaluation(evaluationData);
        const evaluation = await evaluationRepository.getEvaluationById(createdEvaluation.id);
        expect(evaluation).to.have.property('userId', 1);
        expect(evaluation).to.have.property('professorId', 1);
        expect(evaluation).to.have.property('classId', 1);
        expect(evaluation).to.have.property('semester', '2023.1');
    });

    it('deve atualizar uma avaliação', async function () {
        const evaluationData = {
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationRepository.createEvaluation(evaluationData);
        const updatedEvaluation = await evaluationRepository.updateEvaluation(evaluation.id, { semester: '2023.2' });
        expect(updatedEvaluation).to.have.property('semester', '2023.2');
    });

    it('deve deletar uma avaliação', async function () {
        const evaluationData = {
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationRepository.createEvaluation(evaluationData);
        await evaluationRepository.deleteEvaluation(evaluation.id);
        const evaluations = await evaluationRepository.getAllEvaluations();
        expect(evaluations).to.have.lengthOf(0);
    });
});

describe('Testes de service', function () {
    
    let evaluationService: EvaluationService;
    let evaluationRepository: EvaluationRepository;

    beforeEach(function () {
        evaluationRepository = new EvaluationRepository();
        evaluationService = new EvaluationService(evaluationRepository);
    });

    afterEach(function () {
        evaluationRepository.deleteAllEvaluations();
    });

    it('deve criar uma nova avaliação', async function () {
        const evaluationData = {
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationService.createEvaluation(evaluationData);
        expect(evaluation).to.have.property('userId', 1);
        expect(evaluation).to.have.property('professorId', 1);
        expect(evaluation).to.have.property('classId', 1);
        expect(evaluation).to.have.property('semester', '2023.1');
    });

    it('deve retornar todas as avaliações', async function () {
        const evaluationData1 = {
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluationData2 = {
            userId: 1,
            professorId: 1,
            classId: 1,
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
            userId: 1,
            professorId: 1,
            classId: 1,
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
        expect(evaluation).to.have.property('userId', 1);
        expect(evaluation).to.have.property('professorId', 1);
        expect(evaluation).to.have.property('classId', 1);
        expect(evaluation).to.have.property('semester', '2023.1');
    });

    it('deve atualizar uma avaliação', async function () {
        const evaluationData = {
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationService.createEvaluation(evaluationData);
        const updatedEvaluation = await evaluationService.updateEvaluation(evaluation.id, { semester: '2023.2' });
        expect(updatedEvaluation).to.have.property('semester', '2023.2');
    });

    it('deve deletar uma avaliação', async function () {
        const evaluationData = {
            userId: 1,
            professorId: 1,
            classId: 1,
            semester: '2023.1',
            didacticGrade: 4,
            didacticComment: "",
            evalGrade: 4,
            evalComment: "",
            materialGrade: 4,
            materialComment: ""
        };
        const evaluation = await evaluationService.createEvaluation(evaluationData);
        await evaluationService.deleteEvaluation(evaluation.id);
        const evaluations = await evaluationService.getAllEvaluations();
        expect(evaluations).to.have.lengthOf(0);
    });
});
