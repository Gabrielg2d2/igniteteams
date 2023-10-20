import { AdapterLocalStorage } from "./adapter-async-storage";

type UserType = {
  id: string;
  name: string;
  teams: string[];
};

type GroupType = {
  id: string;
  name: string;
  users: UserType[];
};

export class Repository {
  keyGroup = "@group-value-key";
  constructor(private adapter = new AdapterLocalStorage()) {}

  async listGroups() {
    const groups = await this.adapter.get(this.keyGroup);
    if (!groups) return [];
    return JSON.parse(groups) as GroupType[];
  }

  async createNewGroup(nameNewGroup: string) {
    const result = await this.listGroups();

    const groupAlreadyExists = result.find(
      (group) => group.name === nameNewGroup
    );

    if (groupAlreadyExists) {
      return {
        error: ["Group already exists"],
      };
    }

    const newGroup = {
      id: String(Math.random()),
      name: nameNewGroup,
      users: [],
    };

    result.push(newGroup);

    await this.adapter.set(this.keyGroup, JSON.stringify(result));
  }

  async removeGroup(id: string) {
    const result = await this.listGroups();

    const groupAlreadyExists = result.find((group) => group.id === id);

    if (!groupAlreadyExists) {
      return {
        error: ["Group not exists"],
      };
    }

    const newGroups = result.filter((group) => group.id !== id);

    await this.adapter.set(this.keyGroup, JSON.stringify(newGroups));
  }

  // ADICIONAR USUÁRIO AO GRUPO

  // REMOVER USUÁRIO DO GRUPO

  // LISTAR USUÁRIOS DO GRUPO
}
