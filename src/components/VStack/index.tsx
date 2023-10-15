import { ViewProps } from "react-native";
import * as S from "./styles";

type VStackProps = ViewProps &
  S.ContainerStylesProps & {
    children: React.ReactNode;
  };

export function VStack({
  space = 0,
  children,
  borderRadius = 0,
  bgColor,
  ...props
}: VStackProps) {
  return (
    <S.Container
      borderRadius={borderRadius}
      space={space}
      bgColor={bgColor}
      {...props}
    >
      {children}
    </S.Container>
  );
}
