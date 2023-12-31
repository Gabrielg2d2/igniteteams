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
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { useTheme } from "styled-components/native";

import { ListEmpty } from "@components/ListEmpty";
import { UserType } from "@domain/Group/types";
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
  players: UserType[];
  groupName: string;
  inputRefNewPlayerName: React.RefObject<TextInput>;
};

export function PlayersTemplate(props: PlayersTemplateProps) {
  const { COLORS } = useTheme();

  const listCurrentPlayers = props.players.filter(
    (item) => item.teams[0].toLowerCase() === props.team.toLowerCase()
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
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
              inputRef={props.inputRefNewPlayerName}
              placeholder="Nome da pessoa"
              autoCorrect={false}
              onChange={(e) => props.setValuePerson(e.nativeEvent.text)}
              value={props.valuePerson}
              onSubmitEditing={props.handleAddPlayer}
              returnKeyType="send"
            />
            <ButtonIcon
              icon="add"
              onPress={props.handleAddPlayer}
              disabled={!props.valuePerson.length}
            />
          </HStack>

          <HStack space={2}>
            <FlatList
              data={[
                {
                  id: "team a",
                  name: "Time A",
                },
                {
                  id: "team b",
                  name: "Time B",
                },
              ]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Filter
                  title={item.name}
                  isActive={item.id.toLowerCase() === props.team.toLowerCase()}
                  onPress={() => props.setTeam(item.id)}
                />
              )}
              horizontal
            />
            <S.NumberOfPlayers>{props.players.length}</S.NumberOfPlayers>
          </HStack>

          <FlatList
            data={listCurrentPlayers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlayerCard
                name={item.name}
                onPressRemove={() => props.handleRemovePlayer(item.id)}
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
    </KeyboardAvoidingView>
  );
}
