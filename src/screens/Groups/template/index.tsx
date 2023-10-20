import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { FlatList } from "react-native";

import { Button } from "@components/Button";
import { ListEmpty } from "@components/ListEmpty";
import * as S from "./styles";

type UserType = {
  id: string;
  name: string;
  teams: string[];
};

export type GroupType = {
  id: string;
  name: string;
  users: UserType[];
};

export type GroupsTemplateProps = {
  groups: GroupType[];
  navigateToNewGroups: () => void;
  navigateToPlayers: (group: GroupType) => void;
};

export function GroupsTemplate(props: GroupsTemplateProps) {
  return (
    <S.Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={props.groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupCard
            title={item.name}
            onPress={() => props.navigateToPlayers(item)}
          />
        )}
        contentContainerStyle={
          !props.groups.length ? { flex: 1 } : { paddingBottom: 40 }
        }
        ListEmptyComponent={
          <ListEmpty
            title="Nenhuma turma cadastrada"
            message="Que tal criar uma turma e chamar os amigos?"
          />
        }
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" onPress={props.navigateToNewGroups} />
    </S.Container>
  );
}
