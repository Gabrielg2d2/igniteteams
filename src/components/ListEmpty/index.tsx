import * as S from "./styles";

type ListEmptyProps = {
  title: string;
  message: string;
};

export function ListEmpty({
  message = "Lista vazia",
  title = "Título",
}: ListEmptyProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Message>{message}</S.Message>
    </S.Container>
  );
}
