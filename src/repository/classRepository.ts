import { Class } from "../models/class";

export class ClassRepository {

    // Creates a new Class entity
    async createClass(name: string, semester: string, courseId: number,professorId: number) {
        // Uses the `create` method to save the new instance in the Database
        return await Class.create({
            name: name,
            semester: semester,
            courseId: courseId,
            professorId: professorId,
        });
    }

    // Returns all saved Class entities
    async getAllClasses() {
        return await Class.findAll();
    }

    async getClassesByProfessorId(professorId: number){
        return await Class.findAll({where: {professorId: professorId}});
    }

    // Returns all saved Class entities with the given Course ID
    async filteredClasses(reqCourseId: number){
        return await Class.findAll({where: {courseId: reqCourseId}});
    }

    // Deletes a Class by its course id
    async deleteClass(classId: number){
        return await Class.destroy({where: {id:classId}});
    }

    // Deletes all CLass entity entries
    async deleteAllClasses(){

        Class.truncate();
        
    }

}
