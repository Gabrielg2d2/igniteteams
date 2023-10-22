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

  function navigateToPlayers(groupName: string, groupId: string) {
    navigation.navigate("players", { groupName, groupId });
  }

  return {
    goBack,
    navigateToGroups,
    navigateToNewGroups,
    navigateToPlayers,
  };
};
