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
        return await Professor.findAll({ where: { name: professorName } });
    }


    // Deletes a Professor by ID
    async deleteProfessor(id: number) {
        const result = await Professor.destroy({
            where: { id: id }
        });
        return result > 0; // Returns true if a Professor was deleted
    }

    // Deletes all Professors
    async deleteAllProfessors(){
        Professor.truncate();
    }
}
