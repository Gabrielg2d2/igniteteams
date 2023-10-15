import { TextInputProps } from "react-native";
import * as S from "./styles";

export function Input(props: TextInputProps) {
  return <S.Container {...props} />;
}
