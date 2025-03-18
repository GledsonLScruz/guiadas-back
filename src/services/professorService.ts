import { ProfessorRepository } from "../repository/professorRepository";

export class ProfessorService {

    professorRepository: ProfessorRepository;

    constructor(professorRepository: ProfessorRepository) {
        this.professorRepository = professorRepository;
    }

    async filteredProfessors(professorName: string) {
        if (professorName.trim().length > 0 && professorName != null) {
            return await this.professorRepository.filteredProfessors(professorName);
        }

    }

    async getProfessors() {
        return await this.professorRepository.getAllProfessors();
    }

    async createProfessor(professorName: string) {
        if (professorName.trim().length == 0 || professorName === null) {
            throw new Error("Invalid name");
        } else {
            const newProfessor = await this.professorRepository.createProfessor(professorName);
            return newProfessor;
        }
    }

    async deleteProfessor(professorId: number) {
        try {
            this.professorRepository.deleteProfessor(Number(professorId));
        } catch (error: any) {
            throw new Error("Invalid id");
        }
    }

}