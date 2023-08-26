import styled, { css } from "styled-components/native";

export const Container = styled.View`
    ${({theme}) => css`
        flex: 1;
        background-color: ${theme.colors.backgroundCard.eletric};
    `};
`;

export const Content = styled.View`
    height: 70%;
    justify-content: center;
    align-items:center;
`;

export const Footer = styled.View`
    ${({theme}) => css`
        justify-content: center;
        align-items:center;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
        height: 30%;
        background-color: ${theme.colors.background};
        padding: 20px;
    `};
`;

export const WrapperAnimation = styled.View`
    ${({theme}) => css`
        width: 200px;
        height: 300px;
        background-color: ${theme.colors.backgroundCard.eletric};
        justify-content:center;
        align-items: center;
        border-radius: 100px;
        transform: rotate(30deg);
    `};
`;

export const WrapperImage = styled.View`
    ${({theme}) => css`
        width: 200px;
        height: 300px;
       transform: rotate(-30deg);
    `};
`;

export const Title = styled.Text`
    ${({theme}) => css`
        font-size: 40px;
        color: ${theme.colors.text}
        margin-top: 20px;
    `};
`;

export const Subtitle = styled.Text`
    ${({theme}) => css`
        font-size: 16px;
        margin-top: 20px;
        color: ${theme.colors.text}
    `};
`;