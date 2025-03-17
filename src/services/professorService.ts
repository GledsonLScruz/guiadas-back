import { ProfessorRepository } from "../repository/professorRepository";

const professorRepository = new ProfessorRepository();

export const filteredProfessors = async (professorName: string) => {

    if (professorName.trim().length > 0 && professorName != null){
        return await professorRepository.filteredProfessors(professorName);
    }

}

export const getProfessors = async () => {

    return await professorRepository.getAllProfessors();

}

export const createProfessor = async (professorName: string) => {

    if (professorName.trim().length == 0 || professorName === null){
        throw new Error("Invalid name");
    } else {
        const newProfessor = await professorRepository.createProfessor(professorName);
        return newProfessor;
    }
}

export const deleteProfessor = async (professorId: Number) => {

    try {
        professorRepository.deleteProfessor(Number(professorId));
    } catch (error:any){
        throw new Error("Invalid id");
    }

}
