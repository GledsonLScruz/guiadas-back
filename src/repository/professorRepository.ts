import { Professor } from "../models/professor";
import { Op } from 'sequelize';


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

    async getProfessorById(id: number) {
        return await Professor.findByPk(id);
    }

    // Returns all registered Professors with names matching the given string
    async filteredProfessors(professorName: string) {
        return await Professor.findAll({
            where: {
                name: {
                    [Op.like]: `%${professorName}%`,
                },
            },
        });
    }


    // Deletes a Professor by ID
    async deleteProfessor(id: number) {
        const result = await Professor.destroy({
            where: { id: id }
        });
        return result > 0; // Returns true if a Professor was deleted
    }

    // Deletes all Professors
    async deleteAllProfessors() {
        await Professor.truncate({ cascade: true });
    }
}
