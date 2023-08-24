import React, { useEffect } from 'react';
import { Container, Content, Footer, Title, Subtitle, WrapperAnimation, WrapperImage } from './styles';
import api from '../../service/api';

export function Home() {

    useEffect(() => {
        async function getAllPokemons() {
            const response = await api.get('/pokemon');
            const { results } = response.data;

            const payloadPokemons = await Promise.all(
                results.map(async (pokemon) => {
                    const {id, types} = await getMoreInfo(pokemon.url)
                })
            );
        }

        getAllPokemons();
    }, []);

    return (
        <Container>
            
        </Container>
    )
}