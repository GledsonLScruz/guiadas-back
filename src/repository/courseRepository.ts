import { Course } from "../models/course";
import { Op } from 'sequelize';

export class CourseRepository {

    // Creates a new Course
    async createCourse(name: string,) {

        return await Course.create({
            name: name
        });

    }

    // Returns all registered Courses
    async getAllCourses() {

        return await Course.findAll();

    }

    // Returns all registered Courses with names matching the given string
    async filteredCourses(courseName: string) {

        return await Course.findAll({
            where: {
                name: {
                    [Op.like]: `%${courseName}%`,
                },
            },
        });

    }

    // Deletes a Course by its id
    async deleteCourse(courseId: number) {

        try {
            return await Course.destroy({ where: { id: courseId } });
        } catch (error: any) {
            throw new Error("Invalid id");
        }
    }

    // Empties the database
    async deleteAllCourses() {

        await Course.truncate({ cascade: true });

    }

}
