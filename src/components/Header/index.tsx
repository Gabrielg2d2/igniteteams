import { CaretLeft } from "phosphor-react-native";
import * as S from "./styles";
import logoImg from "@assets/logo.png";

type HeaderProps = {
  showBackButton?: boolean;
  onPressBackButton?: () => void;
};

export function Header({
  showBackButton = false,
  onPressBackButton,
}: HeaderProps) {
  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton onPress={onPressBackButton}>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={logoImg} alt="Logo" />
    </S.Container>
  );
}
