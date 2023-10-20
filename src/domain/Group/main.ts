export class Main {
  constructor() {
    console.log("Main");
  }

  // CRIAR NOVO GRUPO
  createNewGroup(nameNewGroup: string) {
    // Verify if the group already exists
    // If not, create a new group -> register in repository
    // If yes, return an error - finish
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
}
