import { afterEach, beforeEach, describe } from "node:test";
import { ProfessorRepository } from "../src/repository/professorRepository";
import { ProfessorService } from "../src/services/professorService";
import { expect } from "chai";

describe('Testes de repositório Professors', function () {

    let professorRepository: ProfessorRepository;

    before(async function () {
        professorRepository = new ProfessorRepository();
        await professorRepository.deleteAllProfessors();
    });

    beforeEach(async function () {
        await professorRepository.deleteAllProfessors();
    });

    afterEach(async function () {
        await professorRepository.deleteAllProfessors();
    });

    it('deve criar um novo professor', async function () {
        const professor = await professorRepository.createProfessor('Professor Teste');
        expect(professor.dataValues).to.have.property('name', 'Professor Teste');
    });

    it('deve retornar todos os professores', async function () {
        await professorRepository.deleteAllProfessors();

        await professorRepository.createProfessor('Professor 1');
        await professorRepository.createProfessor('Professor 2');

        const professors = await professorRepository.getAllProfessors();
        expect(professors).to.have.lengthOf(2);
    });

    it('deve filtrar professores pelo nome', async function () {
        await professorRepository.createProfessor('Professor Filtrado');
        await professorRepository.createProfessor('Outro Professor');

        const filteredProfessors = await professorRepository.filteredProfessors('Filtrado');
        expect(filteredProfessors).to.have.lengthOf(1);
        expect(filteredProfessors[0].dataValues).to.have.property('name', 'Professor Filtrado');
    });

    it('deve deletar um professor', async function () {
        await professorRepository.deleteAllProfessors();

        const professor = await professorRepository.createProfessor('Professor a Deletar');

        await professorRepository.deleteProfessor(professor.dataValues.id);

        const professors = await professorRepository.getAllProfessors();
        expect(professors).to.have.lengthOf(0);
    });

});
describe('Testes de service Professors', function () {
    let professorService: ProfessorService;
    let professorRepository: ProfessorRepository;

    before(function () {
        professorRepository = new ProfessorRepository();
        professorService = new ProfessorService(professorRepository);
    });

    beforeEach(async function () {
        await professorRepository.deleteAllProfessors();
    });

    it('deve criar um novo professor através do service', async function () {
        await professorRepository.deleteAllProfessors(); 

        const professor = await professorService.createProfessor('Professor Teste');
        expect(professor.dataValues).to.have.property('name', 'Professor Teste');
    });

    it('deve listar todos os professores através do service', async function () {
        await professorRepository.deleteAllProfessors();

        await professorService.createProfessor('Professor 1');
        await professorService.createProfessor('Professor 2');

        const professors = await professorService.getProfessors();
        expect(professors).to.have.lengthOf(2);
    });

    it('deve filtrar professores pelo nome através do service', async function () {
        await professorRepository.deleteAllProfessors();

        await professorService.createProfessor('Professor Filtrado');
        await professorService.createProfessor('Outro Professor');

        const filteredProfessors = await professorService.filteredProfessors('Filtrado');
        expect(filteredProfessors!).to.have.lengthOf(1);
        expect(filteredProfessors![0].dataValues).to.have.property('name', 'Professor Filtrado');
    });

    it('deve deletar um professor através do service', async function () {
        await professorRepository.deleteAllProfessors();
        
        const professor = await professorService.createProfessor('Professor a Deletar');
        const result = await professorService.deleteProfessor(professor.dataValues.id);

        expect(result).to.be.true;
        const professors = await professorService.getProfessors();
        expect(professors).to.have.lengthOf(0);
    });
}); 