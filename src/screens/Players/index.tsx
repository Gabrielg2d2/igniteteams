import { MainGroup } from "@domain/Group/main";
import { UserType } from "@domain/Group/types";
import { useRoute } from "@react-navigation/native";
import { useNavigationCustom } from "@routes/navigationCustom";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { PlayersTemplate, PlayersTemplateProps } from "./template";

type RouteParams = {
  groupId: string;
};

export function Players() {
  const routes = useRoute();
  const { groupId } = routes.params as RouteParams;
  const [mainGroup] = useState(new MainGroup());
  const { navigateToGroups } = useNavigationCustom();

  const [valuePerson, setValuePerson] = useState("");
  const [players, setPlayers] = useState<UserType[]>([]);
  const [team, setTeam] = useState("team a");

  const loadPlayers = useCallback(async () => {
    const data = await mainGroup.listUsersFromGroup(groupId);
    setPlayers(data);
  }, [groupId]);

  const handleAddPlayer = useCallback(async () => {
    const { errors, messages } = await mainGroup.addUserToGroup(
      groupId,
      valuePerson,
      team
    );

    if (errors.length) {
      for (const error of errors) {
        Alert.alert("Erro Player", error);
      }
      return;
    }

    if (messages.length) {
      for (const message of messages) {
        Alert.alert("Player", message);
        await loadPlayers();
        setValuePerson("");
      }
    }
  }, [groupId, mainGroup, team, valuePerson]);

  const handleRemovePlayer = useCallback(
    async (playerId: string) => {
      const { errors, messages } = await mainGroup.removeUser(playerId);

      if (errors.length) {
        for (const error of errors) {
          Alert.alert("Erro - Remover Player", error);
        }
        return;
      }

      if (messages.length) {
        for (const message of messages) {
          Alert.alert("Remover Player", message);
          await loadPlayers();
          setValuePerson("");
        }
      }
    },
    [mainGroup]
  );

  const handleRemoveTeam = useCallback(async () => {
    const { errors, messages } = await mainGroup.removeGroup(groupId);

    if (errors.length) {
      for (const error of errors) {
        Alert.alert("Erro - Remover Time", error);
      }
      return;
    }

    if (messages.length) {
      for (const message of messages) {
        Alert.alert("Remover Time", message);
        navigateToGroups();
      }
    }
  }, [groupId, mainGroup]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const propsTemplate: PlayersTemplateProps = {
    navigateToGroups,
    handleAddPlayer,
    handleRemoveTeam,
    handleRemovePlayer,
    setTeam,
    team,
    setValuePerson,
    valuePerson,
    players,
    groupName: groupId,
  };

  return <PlayersTemplate {...propsTemplate} />;
}
