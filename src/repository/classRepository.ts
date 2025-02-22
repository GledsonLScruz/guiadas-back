import { Class } from "../models/class";

export class ClassRepository {

    // Creates a new Class entity
    async createClass(name: string, semester: string, courseId: number) {
        // Uses the `create` method to save the new instance in the Database
        return await Class.create({
            name: name,
            semester: semester,
            courseId: courseId
        });
    }

    // Returns all saved Class entities
    async getAllClasses() {
        return await Class.findAll();
    }

    // Returns all saved Class entities with the given Course ID
    async filteredClasses(reqCourseId: number){
        return await Class.findAll({where: {courseId: reqCourseId}});
    }

}
