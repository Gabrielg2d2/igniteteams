import { useRoute } from "@react-navigation/native";
import { useNavigationCustom } from "@routes/navigationCustom";
import { useState } from "react";
import { PlayersTemplate, PlayersTemplateProps } from "./template";

type RouteParams = {
  group: string;
};

export function Players() {
  const routes = useRoute();
  const { group } = routes.params as RouteParams;
  const { navigateToGroups } = useNavigationCustom();

  const [value, setValue] = useState("");
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

  function handleAddPlayer() {
    if (!value) return;
    const result = players.find(
      (player) => player.toLowerCase() === value.toLowerCase()
    );
    if (result) {
      return alert("Já existe um jogador com esse nome");
    }

    setPlayers([...players, value]);
    setValue("");
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
    setValue,
    value,
    players,
    groupName: group,
  };

  return <PlayersTemplate {...propsTemplate} />;
}
