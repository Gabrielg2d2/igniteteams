import { useNavigation } from "@react-navigation/native";

export const useNavigationCustom = () => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  function navigateToGroups() {
    navigation.navigate("groups");
  }

  function navigateToNewGroups() {
    navigation.navigate("newGroups");
  }

  function navigateToPlayers(groupId: string, groupName?: string) {
    navigation.navigate("players", { groupId, groupName });
  }

  return {
    goBack,
    navigateToGroups,
    navigateToNewGroups,
    navigateToPlayers,
  };
};
