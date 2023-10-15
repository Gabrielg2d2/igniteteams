import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Space } from "@components/Space";
import { Filter } from "@components/Filter";

import { FlatList } from "react-native";
import { useState } from "react";
import { HStack } from "@components/HStack";
import { VStack } from "@components/VStack";
import { useTheme } from "styled-components/native";

import * as S from "./styles";

export type PlayersProps = {};

export function Players(props: PlayersProps) {
  const { COLORS } = useTheme();
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState("Time A");

  return (
    <S.Container>
      <Header showBackButton onPressBackButton={() => console.log("Voltar")} />

      <Space space={24} />

      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />

      <VStack space={12}>
        <HStack borderRadius={6} bgColor={COLORS.GRAY_700}>
          <Input placeholder="Nome da pessoa" autoCorrect={false} />
          <ButtonIcon icon="add" />
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

        <Button type="secondary" title="Remover Turma" />
      </VStack>
    </S.Container>
  );
}
