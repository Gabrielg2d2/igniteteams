import { useState } from "react";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";

import * as S from "./styles";
import { Input } from "@components/Input";
import { Space } from "@components/Space";

export function NewGroup() {
  return (
    <S.Container>
      <Header showBackButton onPressBackButton={() => console.log("Voltar")} />

      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" />

        <Space height={20} />

        <Button title="Criar" />
      </S.Content>
    </S.Container>
  );
}
