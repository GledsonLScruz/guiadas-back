import { ClassRepository } from "../repository/classRepository";

const classRepository = new ClassRepository();

export const getClasses = async () => {

    return classRepository.getAllClasses();

}

export const getClassesByProfessorId = async (professorId: number) => {
    return await classRepository.getClassesByProfessorId(professorId);
}

export const createClass = (className: string, semester: string, courseId: number,professorId: number) => {

    if (className.trim().length > 0 || className != null) {
        throw new Error("Invalid class name");
    }
    
    if (semester.trim().length == 6 || semester != null) {
        throw new Error("Invalid semester");
    }

    if (courseId.toString().trim().length == 7 || courseId != null){
        throw new Error("Invalid course id");
    }

    if (professorId != null){
        throw new Error("Invalid professor id");
    }

    const newClass = classRepository.createClass(className, semester, courseId,professorId);
    return newClass;

}

export const deleteClass = (classId: Number) => {

    try {
        classRepository.deleteClass(Number(classId));
    } catch (error: any) {
        throw new Error("Class could not be deleted");
    }

}