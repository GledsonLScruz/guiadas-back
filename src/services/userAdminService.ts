
import { UserAdminRepository } from "../repository/userAdminRepository";

const userAdminRepo = new UserAdminRepository();

export const getUserAdmins = async () => {
    const userAdmins = await userAdminRepo.getAllUserAdmins();
    return userAdmins;

};

export const createUserAdmin = async (
    name: string,
    email: string,
    password: string
) => {

    const userAdmin = await userAdminRepo.createUserAdmin(name, email, password);
    return userAdmin;

};

export const updateUserAdmin = async (
    id: number,
    name: string,
    email: string,
    password: string
) => {

    const updatedUserAdmin = await userAdminRepo.updateUserAdmin(
        id,
        name,
        email,
        password
    );
    return updatedUserAdmin;

};

export const deleteUserAdmin = async (id: number) => {
    const result = await userAdminRepo.deleteUserAdmin(id);
    return result;

};
