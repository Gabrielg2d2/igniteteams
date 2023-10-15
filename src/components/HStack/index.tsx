import { ViewProps } from "react-native";
import * as S from "./styles";

type HStackProps = ViewProps &
  S.ContainerStylesProps & {
    children: React.ReactNode;
  };

export function HStack({
  space = 0,
  children,
  borderRadius = 0,
  bgColor,
  ...props
}: HStackProps) {
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
