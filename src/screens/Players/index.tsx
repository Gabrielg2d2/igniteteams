import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Space } from "@components/Space";
import { Filter } from "@components/Filter";

import * as S from "./styles";

export type PlayersProps = {};

export function Players(props: PlayersProps) {
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

      <Filter title="Time a" isActive />
      <Filter title="Time b" />

      <Space height={20} />

      <Button type="secondary" title="Remover Turma" />
    </S.Container>
  );
}
