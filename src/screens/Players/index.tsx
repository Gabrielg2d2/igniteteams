import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
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
    </S.Container>
  );
}
