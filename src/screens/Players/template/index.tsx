import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Space } from "@components/Space";

import { PlayerCard } from "@components/PlayerCard";
import { HStack } from "@components/Stacks/HStack";
import { VStack } from "@components/Stacks/VStack";
import { useState } from "react";
import { FlatList } from "react-native";
import { useTheme } from "styled-components/native";

import { ListEmpty } from "@components/ListEmpty";
import { GroupType } from "@domain/Group/types";
import { useRoute } from "@react-navigation/native";
import { useNavigationCustom } from "@routes/navigationCustom";
import * as S from "./styles";

type RouteParams = {
  group: GroupType;
};

export function PlayersTemplate() {
  const { COLORS } = useTheme();
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

  return (
    <S.Container>
      <Header showBackButton onPressBackButton={navigateToGroups} />

      <Space space={24} />

      <Highlight
        title={group.name}
        subtitle="Adicione a galera e separe os times"
      />

      <VStack space={12}>
        <HStack borderRadius={6} bgColor={COLORS.GRAY_700}>
          <Input
            placeholder="Nome da pessoa"
            autoCorrect={false}
            onChange={(e) => setValue(e.nativeEvent.text)}
            value={value}
          />
          <ButtonIcon
            icon="add"
            onPress={handleAddPlayer}
            disabled={!value.length}
          />
        </HStack>

        <HStack space={2}>
          <FlatList
            data={["time a", "time b"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Filter
                title={item}
                isActive={item.toLowerCase() === team.toLowerCase()}
                onPress={() => setTeam(item)}
              />
            )}
            horizontal
          />
          <S.NumberOfPlayers>{players.length}</S.NumberOfPlayers>
        </HStack>

        <FlatList
          data={players}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <PlayerCard
              name={item}
              onPressRemove={() => handleRemovePlayer(item)}
            />
          )}
          contentContainerStyle={
            !players.length ? { flex: 1 } : { paddingBottom: 40 }
          }
          ListEmptyComponent={
            <ListEmpty
              title="Lista vazia"
              message="Não há jogadores adicionados ao time!"
            />
          }
          showsVerticalScrollIndicator={false}
        />

        <Button type="secondary" title="Remover Turma" />
      </VStack>
    </S.Container>
  );
}
