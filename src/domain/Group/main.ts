import { Repository } from "./repository/repository";

export class MainGroup {
  constructor(private repository = new Repository()) {}

  async listGroups() {
    return await this.repository.listGroups();
  }

  async createNewGroup(newNameGroup: string) {
    return await this.repository.createNewGroup(newNameGroup);
  }

  async removeGroup(nameGroup: string) {
    return await this.repository.removeGroup(nameGroup);
  }

  async addUserToGroup(idGroup: string, newUserName: string, nameTeam: string) {
    return await this.repository.addNewUserToGroup(
      idGroup,
      newUserName,
      nameTeam
    );
  }

  async listUsersFromGroup(idGroup: string) {
    return await this.repository.listUsersFromGroup(idGroup);
  }

  async removeUser(nameUser: string) {
    return await this.repository.removeUser(nameUser);
  }
}
