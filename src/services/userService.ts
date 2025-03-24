import { UserRepository } from "../repository/userRepository";


const userRepo = new UserRepository();

export const getUsers = async () => {

      const users = await userRepo.getAllUsers();
      return users;

};

export const findUserByUsername = async (username: string) => {
      const user = await userRepo.findUserByUsername(username);
      return user;
};

export const createUser = async (
      name: string,
      email: string,
      password: string,
      startSemester: string,
      enrolledCourseId: string
) => {

      const emailPattern = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/;

      if (name.trim().length == 0 || name === null){
            throw new Error("Invalid name");
      }
      
      if (!emailPattern.test(email) || !email.includes("ufcg.edu.br")){
            throw new Error("Invalid email")
      }
      
      if (password.trim().length == 0 || password.trim().length < 6 || password === null){
            throw new Error("Invalid password")
      }
          
      if (startSemester.trim().length == 0 || startSemester.trim().length != 6 || startSemester === null){
            throw new Error("Invalid semester")
      }

      if (enrolledCourseId.trim().length == 0 || enrolledCourseId.trim().length != 7 || enrolledCourseId === null){
            throw new Error("Invalid course id");
      }

      const user = await userRepo.createUser(name, email, password, startSemester, Number(enrolledCourseId));
      return user;

      }



export const updateUser = async (
      id: number,
      name: string,
      email: string,
      password: string,
      startSemester: string,
      enrolledCourseId: string
) => {

      const updatedUser = await userRepo.updateUser(id, name, email, password, startSemester, Number(enrolledCourseId));
      return updatedUser;

};

export const deleteUser = async (id: number) => {

      const result = await userRepo.deleteUser(id);
      return result;

};

export const deleteAllUsers = async () => {

      userRepo.deleteAllUsers();

}

