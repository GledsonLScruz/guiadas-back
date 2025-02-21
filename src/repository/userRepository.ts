import { User } from "../models/user";


export class UserRepository {
    async createUser(name: string, email: string, password: string, startSemester: string,
        enrolledCourseId: string,) {
        return await User.create({
            username: name,
            email,
            password,
            startSemester,
            enrolledCourseId
        });
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async updateUser(id: number, name: string, email: string, password: string, startSemester: string,
        enrolledCourseId: string,) {
        return await User.update({
            username: name,
            email,
            password,
            startSemester,
            enrolledCourseId
        }, {
            where: {
                id: id
            }
        });
    }

    async deleteUser(id: number) {
        return await User.destroy({ where: { id: id } });
    }
}