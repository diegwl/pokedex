import React from 'react';
import { Container, Title } from './style';
import { TouchableOpacityProps } from 'react-native';

type Props = {
    title: string;
} & TouchableOpacityProps

export function Button({title}: Props){
    return(
        <Container>
            <Title>{title}</Title>
        </Container>
    )
}