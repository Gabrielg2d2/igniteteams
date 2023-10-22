import { GroupType, UserType } from "../types";

type ResponseType = {
  errors: string[];
  messages: string[];
};

export interface IRepository {
  listGroups(): Promise<GroupType[]>;
  listUsersFromGroup(idGroup: string): Promise<UserType[]>;
  createNewGroup(nameNewGroup: string): Promise<ResponseType>;
  removeGroup(id: string): Promise<ResponseType>;
  addNewUserToGroup(
    idGroup: string,
    userName: string,
    teamName: string
  ): Promise<ResponseType>;
  removeUser(id: string): Promise<ResponseType>;
}
