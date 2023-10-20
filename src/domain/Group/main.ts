import { Repository } from "./repository/repository";

export class Main {
  constructor(private repository = new Repository()) {}

  // CRIAR NOVO GRUPO
  async createNewGroup(nameNewGroup: string) {
    const { errors, messages } = await this.repository.createNewGroup(
      nameNewGroup
    );
    if (errors.length) {
      for (const error of errors) {
        alert(error);
      }
      return;
    }

    for (const message of messages) {
      alert(message);
    }
  }

  // REMOVER GRUPO
  removeGroup(nameGroup: string) {
    // Verify if the group exists
    // If yes, remove the group -> remove in repository
    // If not, return an error - finish
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
