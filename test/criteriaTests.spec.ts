import { afterEach, beforeEach, describe } from "mocha";
import { CriteriaRepository } from "../src/repository/criteriaRepository";
import { CriteriaService } from "../src/services/criteriaService";

const { chai } = require('chai');
const expect = chai.expect;
const it = chai.expect;

const { mocha } = require('mocha');

describe('Testes de repositório', function () {
    let criteriaRepository: CriteriaRepository;

    beforeEach(function () {
        criteriaRepository = new CriteriaRepository();
    });

    afterEach(function () {
        // Cleanup code after each test
    });

    it('deve criar um novo critério', async function () {
        const criteriaData = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const criteria = await criteriaRepository.createCriteria(
            criteriaData.grade,
            criteriaData.comment,
            criteriaData.name,
            criteriaData.evaluationId
        );
        expect(criteria).to.have.property('grade', 5);
        expect(criteria).to.have.property('comment', 'Excelente professor');
        expect(criteria).to.have.property('name', 'Didática');
        expect(criteria).to.have.property('evaluationId', 1);
    });

    it('deve retornar todos os critérios', async function () {
        const criteriaData1 = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const criteriaData2 = {
            grade: 4,
            comment: 'Bom professor',
            name: 'Pontualidade',
            evaluationId: 1
        };
        await criteriaRepository.createCriteria(
            criteriaData1.grade,
            criteriaData1.comment,
            criteriaData1.name,
            criteriaData1.evaluationId
        );
        await criteriaRepository.createCriteria(
            criteriaData2.grade,
            criteriaData2.comment,
            criteriaData2.name,
            criteriaData2.evaluationId
        );

        const criterias = await criteriaRepository.getAllCriteria();
        expect(criterias).to.have.lengthOf(2);
    });

    it('deve atualizar um critério', async function () {
        const criteriaData = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const criteria = await criteriaRepository.createCriteria(
            criteriaData.grade,
            criteriaData.comment,
            criteriaData.name,
            criteriaData.evaluationId
        );
        await criteriaRepository.updateCriteria(
            Number(criteria.id),
            4,
            'Bom professor',
            'Didática',
            1
        );
        const criterias = await criteriaRepository.getAllCriteria();
        const updatedCriteria = criterias.find((c: { id: any; }) => c.id === criteria.id);
        expect(updatedCriteria).to.have.property('grade', 4);
        expect(updatedCriteria).to.have.property('comment', 'Bom professor');
    });

    it('deve deletar um critério', async function () {
        const criteriaData = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const criteria = await criteriaRepository.createCriteria(
            criteriaData.grade,
            criteriaData.comment,
            criteriaData.name,
            criteriaData.evaluationId
        );
        await criteriaRepository.deleteCriteria(Number(criteria.id));
        const criterias = await criteriaRepository.getAllCriteria();
        expect(criterias).to.have.lengthOf(0);
    });
});

describe('Testes de service', function () {
    let criteriaService: CriteriaService;
    let criteriaRepository: CriteriaRepository;

    beforeEach(function () {
        criteriaRepository = new CriteriaRepository();
        criteriaService = new CriteriaService(criteriaRepository);
    });

    afterEach(function () {
        // Cleanup after each test
    });

    it('deve criar um novo critério', async function () {
        const criteriaData = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const criteria = await criteriaService.createCriteria(
            criteriaData.grade,
            criteriaData.comment,
            criteriaData.name,
            criteriaData.evaluationId
        );
        expect(criteria).to.have.property('grade', 5);
        expect(criteria).to.have.property('comment', 'Excelente professor');
        expect(criteria).to.have.property('name', 'Didática');
        expect(criteria).to.have.property('evaluationId', 1);
    });

    it('deve retornar todos os critérios', async function () {
        const criteriaData1 = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const criteriaData2 = {
            grade: 4,
            comment: 'Bom professor',
            name: 'Pontualidade',
            evaluationId: 1
        };
        await criteriaService.createCriteria(
            criteriaData1.grade,
            criteriaData1.comment,
            criteriaData1.name,
            criteriaData1.evaluationId
        );
        await criteriaService.createCriteria(
            criteriaData2.grade,
            criteriaData2.comment,
            criteriaData2.name,
            criteriaData2.evaluationId
        );

        const criterias = await criteriaService.getAllCriteria();
        expect(criterias).to.have.lengthOf(2);
    });

    it('deve retornar um critério pelo id', async function () {
        const criteriaData = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const createdCriteria = await criteriaService.createCriteria(
            criteriaData.grade,
            criteriaData.comment,
            criteriaData.name,
            criteriaData.evaluationId
        );
        const criteria = await criteriaService.getCriteriaById(createdCriteria.id);
        expect(criteria).to.have.property('grade', 5);
        expect(criteria).to.have.property('comment', 'Excelente professor');
        expect(criteria).to.have.property('name', 'Didática');
        expect(criteria).to.have.property('evaluationId', 1);
    });

    it('deve atualizar um critério', async function () {
        const criteriaData = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const criteria = await criteriaService.createCriteria(
            criteriaData.grade,
            criteriaData.comment,
            criteriaData.name,
            criteriaData.evaluationId
        );
        const updatedCriteria = await criteriaService.updateCriteria(
            Number(criteria.id),
            4,
            'Bom professor',
            'Didática',
            1
        );
        expect(updatedCriteria).to.have.property('grade', 4);
        expect(updatedCriteria).to.have.property('comment', 'Bom professor');
    });

    it('deve deletar um critério', async function () {
        const criteriaData = {
            grade: 5,
            comment: 'Excelente professor',
            name: 'Didática',
            evaluationId: 1
        };
        const criteria = await criteriaService.createCriteria(
            criteriaData.grade,
            criteriaData.comment,
            criteriaData.name,
            criteriaData.evaluationId
        );
        await criteriaService.deleteCriteria(Number(criteria.id));
        const criterias = await criteriaService.getAllCriteria();
        expect(criterias).to.have.lengthOf(0);
    });
}); 