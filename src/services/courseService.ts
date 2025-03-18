import { CourseRepository } from "../repository/courseRepository";

const courseRepository = new CourseRepository();

export const filteredCourses = async (courseName: string) => {

    if (courseName.trim().length > 0 || courseName != null){
        const filteredCourses = await courseRepository.filteredCourses(courseName);
        return filteredCourses;
    } else {
        throw new Error("Invalid course name");
    }

}

export const getCourses = async () => {

    return await courseRepository.getAllCourses();

}

export const createCourse = async (courseName: string) => {

    if (courseName.trim().length == 0 || courseName === null){
        throw new Error("Invalid course name");
    } else {
        const newCourse = await courseRepository.createCourse(courseName);
        return newCourse;
    }

}

export const deleteCourse = async (courseId: Number) => {

    try {
        await courseRepository.deleteCourse(Number(courseId));
    } catch (error: any){
        throw new Error("Invalid course id");
    }
}