import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Space } from "@components/Space";
import { Filter } from "@components/Filter";

import * as S from "./styles";
import { FlatList } from "react-native";
import { useState } from "react";

export type PlayersProps = {};

export function Players(props: PlayersProps) {
  const [players, setPlayers] = useState([]);
  const [team, setTeam] = useState("Time A");

  return (
    <S.Container>
      <Header showBackButton onPressBackButton={() => console.log("Voltar")} />

      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />

      <Space height={20} />

      <S.Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </S.Form>

      <Space height={20} />

      <S.HeaderList>
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
      </S.HeaderList>

      <Space height={20} />

      <Button type="secondary" title="Remover Turma" />
    </S.Container>
  );
}
