import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { useState } from "react";
import { FlatList } from "react-native";

import { Button } from "@components/Button";
import { ListEmpty } from "@components/ListEmpty";
import * as S from "./styles";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    "Galera do teams",
    "Galera do trampo",
    "Galera da faculdade",
    "Galera do nova",
    "Galera do prédio",
    "Galera do role",
    "Galera do churras",
    "Galera do futebol",
  ]);

  return (
    <S.Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => console.log(`clicou: ${item}`)}
          />
        )}
        contentContainerStyle={
          !groups.length ? { flex: 1 } : { paddingBottom: 40 }
        }
        ListEmptyComponent={
          <ListEmpty
            title="Nenhuma turma cadastrada"
            message="Que tal criar uma turma e chamar os amigos?"
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <Button
        title="Criar nova turma"
        onPress={() => console.log("Criar turma")}
      />
    </S.Container>
  );
}
