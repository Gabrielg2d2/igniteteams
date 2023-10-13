import { Header } from "@components/Header";

import * as S from "./styles";
import { Highlight } from "@components/Highlight";

export function Groups() {
  return (
    <S.Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
    </S.Container>
  );
}
