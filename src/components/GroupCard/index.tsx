import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type GroupCardProps = TouchableOpacityProps & {
  title: string;
};

export function GroupCard(props: GroupCardProps) {
  return (
    <S.Container {...props}>
      <S.Icon />
      <S.Title>{props.title}</S.Title>
    </S.Container>
  );
}
