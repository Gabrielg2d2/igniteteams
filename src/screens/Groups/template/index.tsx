import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { FlatList } from "react-native";

import { Button } from "@components/Button";
import { ListEmpty } from "@components/ListEmpty";
import { GroupType } from "@domain/Group/types";
import * as S from "./styles";

export type GroupsTemplateProps = {
  groups: GroupType[];
  navigateToNewGroups: () => void;
  navigateToPlayers: (groupId: string, groupName: string) => void;
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
            onPress={() => props.navigateToPlayers(item.id, item.name)}
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
