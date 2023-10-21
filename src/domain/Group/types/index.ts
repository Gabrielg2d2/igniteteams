export type UserType = {
  id: string;
  name: string;
  teams: string[];
};

export type GroupType = {
  id: string;
  name: string;
  users: UserType[];
};
