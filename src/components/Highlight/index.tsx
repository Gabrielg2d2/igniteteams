import * as S from "./styles";

type HighlightProps = {
  title: string;
  subtitle: string;
};

export function Highlight(props: HighlightProps) {
  return (
    <S.Container>
      <S.Title>{props.title}</S.Title>
      <S.Subtitle>{props.subtitle}</S.Subtitle>
    </S.Container>
  );
}
