import { Class } from "../models/class";

export class ClassRepository {

    // Cria uma nova Class
    async createClass(name: string, semester: string, courseId: number) {
        // Use o método `create` para salvar no banco de dados
        return await Class.create({
            name: name,
            semester: semester,
            courseId: courseId
        });
    }

    async getAllClasses() {
        return await Class.findAll();
    }

    async filteredClasses(reqCourseId: number){
        return await Class.findAll({where: {courseId: reqCourseId}});
    }

}
