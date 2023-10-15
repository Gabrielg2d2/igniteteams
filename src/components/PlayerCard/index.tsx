import { ButtonIcon } from "@components/ButtonIcon";
import * as S from "./styles";

type PlayerCardProps = {
  name: string;
  onPressRemove?: () => void;
};

export function PlayerCard(props: PlayerCardProps) {
  return (
    <S.Container>
      <S.Icon name="person" />

      <S.Name>{props.name}</S.Name>

      <ButtonIcon icon="close" type="secondary" onPress={props.onPressRemove} />
    </S.Container>
  );
}
