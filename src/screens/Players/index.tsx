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

  const handleAddPlayer = useCallback(async () => {
    const { errors, messages } = await mainGroup.addUserToGroup(
      groupId,
      valuePerson,
      team
    );

    console.log("messages: ", messages);

    if (errors.length) {
      for (const error of errors) {
        Alert.alert("Erro Player", error);
      }
      return;
    }

    if (messages.length) {
      for (const message of messages) {
        Alert.alert("Player", message);
        setValuePerson("");
      }
    }
  }, [groupId, mainGroup, team, valuePerson]);

  function handleRemovePlayer(player: string) {
    setPlayers(
      players.filter((item) => item.name.toLowerCase() !== player.toLowerCase())
    );
  }

  function handleRemoveTeam() {
    setPlayers([]);
  }

  useEffect(() => {
    async function loadPlayers() {
      const data = await mainGroup.listUsersFromGroup(groupId);
      setPlayers(data);
    }

    loadPlayers();
  }, [handleAddPlayer]);

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
