import { MainGroup } from "@domain/Group/main";
import { UserType } from "@domain/Group/types";
import { useRoute } from "@react-navigation/native";
import { useNavigationCustom } from "@routes/navigationCustom";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Platform, TextInput } from "react-native";
import { PlayersTemplate, PlayersTemplateProps } from "./template";

type RouteParams = {
  groupId: string;
  groupName: string;
};

export function Players() {
  const routes = useRoute();
  const { groupId, groupName } = routes.params as RouteParams;
  const [mainGroup] = useState(new MainGroup());
  const { navigateToGroups } = useNavigationCustom();

  const [valuePerson, setValuePerson] = useState("");
  const [players, setPlayers] = useState<UserType[]>([]);
  const [team, setTeam] = useState("team a");
  const inputRefNewPlayerName = useRef<TextInput>(null);

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
        inputRefNewPlayerName.current?.blur();
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
    const partOfTheName = groupName.slice(0, -1);

    if (Platform.OS === "android") {
      return Alert.alert("Remover Time", "Deseja realmente remover o grupo?", [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: async () => {
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
          },
        },
      ]);
    }

    Alert.prompt(
      "Remover Time",
      `Digite o nome do grupo "${groupName}" para confirmar a remoção`,
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: async (inputName) => {
            if (inputName?.toLowerCase() !== groupName?.toLowerCase()) {
              Alert.alert(
                "Erro",
                `O nome "${inputName}" não corresponde ao nome do time.`
              );
              return;
            }

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
          },
        },
      ],
      "plain-text",
      partOfTheName
    );
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
    groupName,
    inputRefNewPlayerName,
  };

  return <PlayersTemplate {...propsTemplate} />;
}
