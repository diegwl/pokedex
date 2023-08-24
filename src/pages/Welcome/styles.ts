import styled, { css } from "styled-components/native";

export const Container = styled.View`
    ${({theme}) => css`
        flex: 1;
        background-color: ${theme.colors.background};
    `};
`;

export const Content = styled.View`
    height: 70%;
`;

export const Footer = styled.View`
    ${({theme}) => css`
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        height: 30%;
        background-color: ${theme.colors.backgroundCard.eletric};
    `};
`;