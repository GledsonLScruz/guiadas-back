
import { UserAdmin } from "../models/userAdmin";

export class UserAdminRepository {
  async createUserAdmin(name: string, email: string, password: string) {
    return await UserAdmin.create({ name, email, password });
  }

  async getAllUserAdmins() {
    return await UserAdmin.findAll();
  }

  async updateUserAdmin(id: number, name: string, email: string, password: string) {
    return await UserAdmin.update(
      { name, email, password },
      { where: { id } }
    );
  }

  async deleteUserAdmin(id: number) {
    return await UserAdmin.destroy({ where: { id } });
  }
}
