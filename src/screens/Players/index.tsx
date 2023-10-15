import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import * as S from "./styles";
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";

export type PlayersProps = {};

export function Players(props: PlayersProps) {
  return (
    <S.Container>
      <Header showBackButton onPressBackButton={() => console.log("Voltar")} />

      <Highlight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />

      <ButtonIcon icon="add" />

      <Button type="secondary" title="Remover Turma" />
    </S.Container>
  );
}
