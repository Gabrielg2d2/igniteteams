import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  type?: "primary" | "secondary";
};

export function Button({ title, type = "primary", ...props }: ButtonProps) {
  return (
    <S.Container type={type} {...props}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
