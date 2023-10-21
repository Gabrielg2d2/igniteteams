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

  async addUserToGroup(idGroup: string, nameUser: string, teamName: string) {
    return await this.repository.addNewUserToGroup(idGroup, nameUser, teamName);
  }

  async listUsersFromGroup(idGroup: string) {
    return await this.repository.listUsersFromGroup(idGroup);
  }

  async removeUser(nameUser: string) {
    return await this.repository.removeUser(nameUser);
  }
}
