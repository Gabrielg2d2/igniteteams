import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

import { Input } from "@components/Input";
import { Space } from "@components/Space";
import { useNavigationCustom } from "@routes/navigationCustom";
import { useState } from "react";

import * as S from "./styles";

export function NewGroup() {
  const { navigateToPlayers, goBack } = useNavigationCustom();

  const [newGroup, setNewGroup] = useState("");

  function handleCreateGroup() {
    navigateToPlayers(newGroup);
  }

  return (
    <S.Container>
      <Header showBackButton onPressBackButton={goBack} />

      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          value={newGroup}
          onChangeText={setNewGroup}
        />

        <Space space={20} />

        <Button
          title="Criar"
          disabled={!newGroup.length}
          onPress={handleCreateGroup}
        />
      </S.Content>
    </S.Container>
  );
}
