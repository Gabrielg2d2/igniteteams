import { MainGroup } from "@domain/Group/main";
import { useRoute } from "@react-navigation/native";
import { useNavigationCustom } from "@routes/navigationCustom";
import { useState } from "react";
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
  const [players, setPlayers] = useState<string[]>([
    "Jogador 1",
    "Jogador 2",
    "Jogador 3",
    "Jogador 4",
    "Jogador 5",
    "Jogador 6",
    "Jogador 7",
    "Jogador 8",
  ]);
  const [team, setTeam] = useState("Time A");

  async function handleAddPlayer() {
    const { errors, messages } = await mainGroup.addUserToGroup(
      groupId,
      valuePerson,
      team
    );
    if (errors) {
      for (const error of errors) {
        Alert.alert("Erro Player", error);
      }
      return;
    }

    if (messages) {
      for (const message of messages) {
        Alert.alert("Player", message);
      }
    }
  }

  function handleRemovePlayer(player: string) {
    setPlayers(
      players.filter((item) => item.toLowerCase() !== player.toLowerCase())
    );
  }

  function handleRemoveTeam() {
    setPlayers([]);
  }

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
