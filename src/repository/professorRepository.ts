import { Professor } from "../models/professor";

export class ProfessorRepository {

    // Cria um novo Professor
    async createProfessor(name: string,) {
        // Use o método `create` para salvar no banco de dados
        return await Professor.create({
            name: name
        });
    }

    async getAllProfessors() {
        return await Professor.findAll();
    }

    async filteredProfessors(professorName: string) {
        return await Professor.findAll({where: {name: professorName}});
    }

}
