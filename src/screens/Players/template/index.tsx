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
import { FlatList } from "react-native";
import { useTheme } from "styled-components/native";

import { ListEmpty } from "@components/ListEmpty";
import * as S from "./styles";

export type PlayersTemplateProps = {
  navigateToGroups: () => void;
  handleAddPlayer: () => void;
  handleRemoveTeam: () => void;
  handleRemovePlayer: (player: string) => void;
  setTeam: (team: string) => void;
  team: string;
  setValuePerson: (value: string) => void;
  valuePerson: string;
  players: string[];
  groupName: string;
};

export function PlayersTemplate(props: PlayersTemplateProps) {
  const { COLORS } = useTheme();

  return (
    <S.Container>
      <Header showBackButton onPressBackButton={props.navigateToGroups} />

      <Space space={24} />

      <Highlight
        title={props.groupName}
        subtitle="Adicione a galera e separe os times"
      />

      <VStack space={12}>
        <HStack borderRadius={6} bgColor={COLORS.GRAY_700}>
          <Input
            placeholder="Nome da pessoa"
            autoCorrect={false}
            onChange={(e) => props.setValuePerson(e.nativeEvent.text)}
            value={props.valuePerson}
          />
          <ButtonIcon
            icon="add"
            onPress={props.handleAddPlayer}
            disabled={!props.valuePerson.length}
          />
        </HStack>

        <HStack space={2}>
          <FlatList
            data={["time a", "time b"]}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Filter
                title={item}
                isActive={item.toLowerCase() === props.team.toLowerCase()}
                onPress={() =>
                  props.setTeam(item === "time a" ? "team a" : "team b")
                }
              />
            )}
            horizontal
          />
          <S.NumberOfPlayers>{props.players.length}</S.NumberOfPlayers>
        </HStack>

        <FlatList
          data={props.players}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <PlayerCard
              name={item}
              onPressRemove={() => props.handleRemovePlayer(item)}
            />
          )}
          contentContainerStyle={
            !props.players.length ? { flex: 1 } : { paddingBottom: 40 }
          }
          ListEmptyComponent={
            <ListEmpty
              title="Lista vazia"
              message="Não há jogadores adicionados ao time!"
            />
          }
          showsVerticalScrollIndicator={false}
        />

        <Button
          type="secondary"
          title="Remover Turma"
          onPress={() => props.handleRemoveTeam()}
        />
      </VStack>
    </S.Container>
  );
}
