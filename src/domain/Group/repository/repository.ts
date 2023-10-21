import { GroupType, UserType } from "../types";
import { AdapterLocalStorage } from "./adapter-async-storage";

type ResponseType = {
  errors: string[];
  messages: string[];
};

export class Repository {
  constructor(
    private keyGroup = "@group-value-key",
    private adapter = new AdapterLocalStorage()
  ) {}

  async listGroups(): Promise<GroupType[]> {
    const groups = await this.adapter.get(this.keyGroup);
    if (!groups) return [];
    return JSON.parse(groups) as GroupType[];
  }

  async createNewGroup(nameNewGroup: string): Promise<ResponseType> {
    if (!nameNewGroup.trim()) {
      return {
        errors: ["Group name is required"],
        messages: [],
      };
    }

    const result = await this.listGroups();

    const groupAlreadyExists = result.find(
      (group) => group.name.toUpperCase() === nameNewGroup.toUpperCase()
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

    result.push(newGroup);

    await this.adapter.set(this.keyGroup, JSON.stringify(result));

    return {
      errors: [],
      messages: ["Group created successfully"],
    };
  }

  async removeGroup(id: string): Promise<ResponseType> {
    if (!id.trim()) {
      return {
        errors: ["Group id is required"],
        messages: [],
      };
    }

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

  async listUsersFromGroup(idGroup: string): Promise<UserType[]> {
    if (!idGroup.trim()) {
      return [];
    }

    const result = await this.listGroups();

    const groupAlreadyExists = result.find((group) => group.id === idGroup);

    if (!groupAlreadyExists) {
      return [];
    }

    const orderedUserList = groupAlreadyExists.users.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });

    return orderedUserList;
  }

  async addNewUserToGroup(
    idGroup: string,
    userName: string,
    teamName: string
  ): Promise<ResponseType> {
    if (!idGroup.trim()) {
      return {
        errors: ["Group id is required"],
        messages: [],
      };
    }

    if (!userName.trim()) {
      return {
        errors: ["User name is required"],
        messages: [],
      };
    }

    if (!teamName.trim()) {
      return {
        errors: ["Team name is required"],
        messages: [],
      };
    }

    const result = await this.listGroups();

    const groupAlreadyExists = result.find((group) => group.id === idGroup);

    if (!groupAlreadyExists) {
      return {
        errors: ["Group not exists"],
        messages: [],
      };
    }

    const userAlreadyExists = groupAlreadyExists.users.find(
      (user) => user.name.toUpperCase() === userName.toUpperCase()
    );

    if (userAlreadyExists) {
      return {
        errors: ["User already exists in this group"],
        messages: [],
      };
    }

    const newUser = {
      id: String(Math.random()),
      name: userName,
      teams: [teamName],
    };

    groupAlreadyExists.users.push(newUser);

    await this.adapter.set(this.keyGroup, JSON.stringify(result));

    return {
      errors: [],
      messages: ["User added successfully"],
    };
  }

  async removeUser(id: string): Promise<ResponseType> {
    if (!id.trim()) {
      return {
        errors: ["User id is required"],
        messages: [],
      };
    }

    const result = await this.listGroups();

    const userAlreadyExists = result.find((group) =>
      group.users.find((user) => user.id === id)
    );

    if (!userAlreadyExists) {
      return {
        errors: ["User not exists"],
        messages: [],
      };
    }

    const arrayRemovingUser = result.map((group) => {
      const newUsers = group.users.filter((user) => user.id !== id);
      return {
        ...group,
        users: newUsers,
      };
    });

    await this.adapter.set(this.keyGroup, JSON.stringify(arrayRemovingUser));

    return {
      errors: [],
      messages: ["User removed successfully"],
    };
  }
}
