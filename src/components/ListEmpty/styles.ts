import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  text-align: center;

  font-size: ${({ theme }) => theme.FONT_SIZE.LG};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  margin-bottom: 8px;
`;

export const Message = styled.Text`
  text-align: center;

  font-size: ${({ theme }) => theme.FONT_SIZE.LG};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
