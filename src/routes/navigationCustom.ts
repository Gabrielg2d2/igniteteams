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

  function navigateToPlayers(group: string) {
    navigation.navigate("players", { group });
  }

  return {
    goBack,
    navigateToGroups,
    navigateToNewGroups,
    navigateToPlayers,
  };
};
