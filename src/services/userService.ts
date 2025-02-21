import { UserRepository } from "../repository/userRepository";


const userRepo = new UserRepository();

export const getUsers = async () => {
   
      const users = await userRepo.getAllUsers();
      return users;
    
};

export const createUser = async (
    name: string, 
    email: string, 
    password: string, 
    startSemester: string, 
    enrolledCourseId: string
) => {
   
      const user = await userRepo.createUser(name, email, password, startSemester, enrolledCourseId);
      return user;
    
};

export const updateUser = async (
    id: number,
    name: string, 
    email: string, 
    password: string, 
    startSemester: string, 
    enrolledCourseId: string
) => {
    
      const updatedUser = await userRepo.updateUser(id, name, email, password, startSemester, enrolledCourseId);
      return updatedUser;
   
};

export const deleteUser = async (id: number) => {
    
      const result = await userRepo.deleteUser(id);
      return result;
    
};
