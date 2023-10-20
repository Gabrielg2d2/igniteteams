import { Repository } from "./repository/repository";

export class MainGroup {
  constructor(private repository = new Repository()) {}

  async listGroups() {
    return await this.repository.listGroups();
  }

  async createNewGroup(nameNewGroup: string) {
    return await this.repository.createNewGroup(nameNewGroup);
  }

  async removeGroup(nameGroup: string) {
    return await this.repository.removeGroup(nameGroup);
  }

  // ADICIONAR USUÁRIO AO GRUPO
  createNewUser(nameUser: string) {
    // Verify if the user already exists
    // If not, create a new user -> register in repository
    // If yes, return an error - finish
  }

  // REMOVER USUÁRIO DO GRUPO
  removeUser(nameUser: string) {
    // Verify if the user exists
    // If yes, remove the user -> remove in repository
    // If not, return an error - finish
  }

  // Add user to group
  addUserToGroup(nameUser: string, nameGroup: string) {
    // Verify if the user exists
    // If not, return an error - finish
    // Verify if the group exists
    // If not, return an error - finish
    // Verify if the user is already in the group
    // If yes, return an error - finish
    // Add user to group -> register in repository
  }
}
