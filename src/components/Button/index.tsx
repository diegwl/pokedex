import React from 'react';
import { Container, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';

type Props = {
    title: string;
} & TouchableOpacityProps

export function Button({title, ...rest}: Props){
    return(
        <Container {...rest} >
            <Title>{title}</Title>
        </Container>
    )
}