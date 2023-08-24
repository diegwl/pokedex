import React from 'react';
import pokemonAnimation from './pokemon.json';
import AnimationLottieView from 'lottie-react-native';
import { Container, Content, Footer, Title, Subtitle, WrapperAnimation, WrapperImage } from './styles';
import { Button } from '../../components/Button';

export function Welcome() {
    return (
        <Container>
            <Content>
                <WrapperAnimation>
                    <WrapperImage>
                        <AnimationLottieView autoPlay source={pokemonAnimation} loop />
                    </WrapperImage>
                </WrapperAnimation>
                <Title>Bem Vindo </Title>
                <Subtitle>Encontro todos os pokémons em um só lugar </Subtitle>
            </Content>
            <Footer>
                <Button title='Iniciar' />
            </Footer>
        </Container>
    )
}