import styled from "styled-components/native";

export type ContainerStylesProps = {
  space?: number;
  bgColor?: string;
  borderRadius?: number;
  direction?: "row" | "column";
};

export const Container = styled.View<ContainerStylesProps>`
  flex-direction: row;
  align-items: center;

  background-color: ${({ bgColor }) => bgColor ?? "transparent"};
  gap: ${({ space }) => (space ? space * 2 : 0)}px;
  border-radius: ${({ borderRadius }) => borderRadius ?? 0}px;
`;
