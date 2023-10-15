import styled from "styled-components/native";

export type ContainerStylesProps = {
  space?: number;
  bgColor?: string;
  borderRadius?: number;
  padding?: string;
};

export const Container = styled.View<ContainerStylesProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;

  padding: ${({ padding }) => padding ?? "0px"};
  background-color: ${({ bgColor }) => bgColor ?? "transparent"};
  gap: ${({ space }) => (space ? space * 2 : 0)}px;
  border-radius: ${({ borderRadius }) => borderRadius ?? 0}px;
`;
