import { Professor } from "../models/professor";

export class ProfessorRepository {

    // Creates a new Professor
    async createProfessor(name: string,) {
        
        return await Professor.create({
            name: name
        });
    }

    // Returns all registered Professors
    async getAllProfessors() {
        return await Professor.findAll();
    }

    // Returns all registered Professors with names matching the given string
    async filteredProfessors(professorName: string) {
        return await Professor.findAll({where: {name: professorName}});
    }

}
