import { afterEach, beforeEach, describe } from "node:test";
import { ProfessorRepository } from "../src/repository/professorRepository";
import { ProfessorService } from "../src/services/professorService";

const { chai } = require('chai');
const expect = chai.expect;
const it = chai.expect;

const { mocha } = require('mocha');

describe('Testes de repositório', function () {
    let professorRepository: ProfessorRepository;

    beforeEach(function () {
        professorRepository = new ProfessorRepository();
    });

    afterEach(function () {
        // Cleanup code after each test
    });

    it('deve criar um novo professor', async function () {
        const professorRepository = new ProfessorRepository();
        const professor = await professorRepository.createProfessor('Professor Teste');
        expect(professor).to.have.property('name', 'Professor Teste');
    });

    it('deve retornar todos os professores', async function () {
        const professorRepository = new ProfessorRepository();
        await professorRepository.createProfessor('Professor 1');
        await professorRepository.createProfessor('Professor 2');

        const professors = await professorRepository.getAllProfessors();
        expect(professors).to.have.lengthOf(2);
    });

    it('deve filtrar professores pelo nome', async function () {
        const professorRepository = new ProfessorRepository();
        await professorRepository.createProfessor('Professor Filtrado');
        await professorRepository.createProfessor('Outro Professor');

        const filteredProfessors = await professorRepository.filteredProfessors('Professor Filtrado');
        expect(filteredProfessors).to.have.lengthOf(1);
        expect(filteredProfessors[0]).to.have.property('name', 'Professor Filtrado');
    });
    it('deve deletar um professor', async function () {
        const professorRepository = new ProfessorRepository();
        const professor = await professorRepository.createProfessor('Professor a Deletar');

        await professorRepository.deleteProfessor(professor.id);

        const professors = await professorRepository.getAllProfessors();
        expect(professors).to.have.lengthOf(0);
    });

});
describe('Testes de service', function () {
    let professorService: ProfessorService;
    let professorRepository: ProfessorRepository;

    beforeEach(function () {
        professorRepository = new ProfessorRepository();
        professorService = new ProfessorService(professorRepository);
    });

    afterEach(function () {
        // Clean up after each test
    });

    it('deve criar um novo professor através do service', async function () {
        const professor = await professorService.createProfessor('Professor Teste');
        expect(professor).to.have.property('name', 'Professor Teste');
    });

    it('deve listar todos os professores através do service', async function () {
        await professorService.createProfessor('Professor 1');
        await professorService.createProfessor('Professor 2');

        const professors = await professorService.getProfessors();
        expect(professors).to.have.lengthOf(2);
    });

    it('deve filtrar professores pelo nome através do service', async function () {
        await professorService.createProfessor('Professor Filtrado');
        await professorService.createProfessor('Outro Professor');

        const filteredProfessors = await professorService.filteredProfessors('Professor Filtrado');
        expect(filteredProfessors!).to.have.lengthOf(1);
        expect(filteredProfessors![0]).to.have.property('name', 'Professor Filtrado');
    });

    it('deve deletar um professor através do service', async function () {
        const professor = await professorService.createProfessor('Professor a Deletar');
        const result = await professorService.deleteProfessor(professor.id);

        expect(result).to.be.true;
        const professors = await professorService.getProfessors();
        expect(professors).to.have.lengthOf(0);
    });
});