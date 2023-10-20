import { AdapterLocalStorage } from "./adapter-async-storage";

type ResponseType = {
  errors: string[];
  messages: string[];
};

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

  async listGroups(): Promise<GroupType[]> {
    const groups = await this.adapter.get(this.keyGroup);
    if (!groups) return [];
    return JSON.parse(groups) as GroupType[];
  }

  async createNewGroup(nameNewGroup: string): Promise<ResponseType> {
    const result = await this.listGroups();

    const groupAlreadyExists = result.find(
      (group) => group.name === nameNewGroup
    );

    if (groupAlreadyExists) {
      return {
        errors: ["Group already exists"],
        messages: [],
      };
    }

    const newGroup = {
      id: String(Math.random()),
      name: nameNewGroup,
      users: [],
    };

    console.log("newGroup: ", newGroup);

    result.push(newGroup);

    await this.adapter.set(this.keyGroup, JSON.stringify(result));

    return {
      errors: [],
      messages: ["Group created successfully"],
    };
  }

  async removeGroup(id: string): Promise<ResponseType> {
    const result = await this.listGroups();

    const groupAlreadyExists = result.find((group) => group.id === id);

    if (!groupAlreadyExists) {
      return {
        errors: ["Group not exists"],
        messages: [],
      };
    }

    const newGroups = result.filter((group) => group.id !== id);

    await this.adapter.set(this.keyGroup, JSON.stringify(newGroups));

    return {
      errors: [],
      messages: ["Group removed successfully"],
    };
  }

  // ADICIONAR USUÁRIO AO GRUPO

  // REMOVER USUÁRIO DO GRUPO

  // LISTAR USUÁRIOS DO GRUPO
}
