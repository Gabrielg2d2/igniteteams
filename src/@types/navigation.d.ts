import { GroupType } from "@domain/Group/types";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      groups: undefined;
      newGroups: undefined;
      players: { group: GroupType };
    }
  }
}
