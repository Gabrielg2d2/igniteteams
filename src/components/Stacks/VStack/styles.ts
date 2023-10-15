import styled from "styled-components/native";

export type ContainerStylesProps = {
  space?: number;
  bgColor?: string;
  borderRadius?: number;
  flex?: number;
  padding?: string;
};

export const Container = styled.View<ContainerStylesProps>`
  flex-direction: column;

  padding: ${({ padding }) => padding ?? "0px"};
  flex: ${({ flex }) => flex ?? 1};
  background-color: ${({ bgColor }) => bgColor ?? "transparent"};
  gap: ${({ space }) => (space ? space * 2 : 0)}px;
  border-radius: ${({ borderRadius }) => borderRadius ?? 0}px;
`;
