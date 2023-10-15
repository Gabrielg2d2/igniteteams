import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type FilterProps = TouchableOpacityProps &
  S.FilterStyleProps & {
    title: string;
  };

export function Filter({ isActive = false, title, ...props }: FilterProps) {
  return (
    <S.Container isActive={isActive} {...props}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
