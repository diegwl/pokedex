import React, { useEffect, useState } from 'react';
import { Container, Title, Header, LoadingScreen } from './styles';
import api from '../../service/api';
import { FlatList, Alert } from 'react-native';
import { Card } from '../../components/Card';
import { PokemonType, Pokemon } from '../../components/Card';
import pokeballHeader from '../../assets/img/pokeball.png';
import { useNavigation } from '@react-navigation/native';
import { Load } from '../../components/Load';
import axios from 'axios';

type Request = {
    id: number
    types: PokemonType[]
}

export function Home() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [load, setLoad] = useState<boolean>(true);
    const [nextPage, setNextPage] = useState<string>('');
    const [fotterLoad, setFooterLoad] = useState<boolean>(false)

    const {navigate} = useNavigation();
    
    function handleNavigation(pokemonId: number) {
        navigate('About', {pokemonId});
      }

    useEffect(() => {
        async function getAllPokemons() {
            try{
                const response = await api.get('/pokemon?offset=0&limit=100');
                const { results, next } = response.data;

                setNextPage(next);

                const payloadPokemons = await Promise.all(
                    results.map(async (pokemon: Pokemon) => {
                        const {id, types} = await getMoreInfo(pokemon.url)

                        return {
                            name: pokemon.name,
                            id,
                            types
                        }
                    })
                );

                setPokemons(payloadPokemons);
            } catch (err) {
                Alert.alert('ops, algo de errado aconteceu, tente mais tarde');
            } finally {
                setLoad(false);
            } 
        }

        getAllPokemons();
    }, []);

    async function getNextPokemons() {
        try{
            const response = await axios.get(nextPage);
            const { results, next } = response.data;

            setNextPage(next);

            const payloadPokemons = await Promise.all(
                results.map(async (pokemon: Pokemon) => {
                    const {id, types} = await getMoreInfo(pokemon.url)

                    return {
                        name: pokemon.name,
                        id,
                        types
                    }
                })
            );

            setPokemons([...pokemons, ...payloadPokemons]);
        } catch (err) {
            Alert.alert('ops, algo de errado aconteceu, tente mais tarde');
        }
    }

    async function getMoreInfo(url: string): Promise<Request> {
        const response = await api.get(url);
        const {id, types} = response.data;

        return {
            id, types
        };
    };

    return load ? (
        <LoadingScreen>
            <Load />
        </LoadingScreen>
    ) : (
        <Container>
            <FlatList 
            ListHeaderComponent={
                <>
                    <Header source={pokeballHeader} />
                    <Title>Pokédex</Title>
                </>
            }
            contentContainerStyle={{paddingHorizontal: 20}}
            data={pokemons}
            keyExtractor={pokemon => pokemon.id.toString()}
            renderItem={({item: pokemon}) => (
                <Card data={pokemon} onPress={() => {
                    handleNavigation(pokemon.id)
                }}/>
                )}
            onEndReached={getNextPokemons}
            onEndReachedThreshold={0.1}
            ListFooterComponent={<Load /> }
            showsVerticalScrollIndicator={false}
            />
        </Container>
    )
}