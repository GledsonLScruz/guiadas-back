import { ClassRepository } from "../repository/classRepository";

const classRepository = new ClassRepository();

export const getClasses = async () => {

    return classRepository.getAllClasses();

}

export const createClass = (className: string, semester: string, courseId: number) => {

    if (className.trim().length > 0 && className != null &&
        semester.trim().length == 6 && semester != null &&
        courseId.toString().trim().length == 7 && courseId != null){
            const newClass = classRepository.createClass(className, semester, courseId);
            return newClass;
        } else {
            throw new Error("Invalid argument!");
        }
    
}

export const deleteClass = (classId: Number) => {

    try {
        classRepository.deleteClass(Number(classId));
    } catch (error: any) {
        throw new Error("Class could not be deleted");
    }

}