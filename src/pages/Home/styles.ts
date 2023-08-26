import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width

export const LoadingScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
    ${({theme}) => css`
        flex: 1;
        background-color: ${theme.colors.background};
        position: relative;
    `};
`;

export const Title = styled.Text`
    ${({theme}) => css`
        font-size: 32px;
        color: ${theme.colors.light_text};
        font-weight: bold;
        line-height: 38px;
    `};
`;

export const Header = styled.ImageBackground`
    ${({theme}) => css`
        height: 220px;
        background-color: ${theme.colors.background};
        width: ${windowWidth}px;
        margin-left: -20px;
    `};
`;
