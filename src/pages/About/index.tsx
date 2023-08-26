import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Alert, ScrollView, Text } from 'react-native';
import api from '../../service/api';
import { useTheme } from 'styled-components';
import { Header, BackButton, ContentImage, CircleImage, PokemonImage, PokemonTypeContainer, Content, PokemonId, PokemonName, PokemonType, PokemonTypeText, DotsImage, Container, Title, StatusBar, Attributes, AttributesNumber, ContentBar, ProgressBar, Ability } from './styles';
import { Feather } from '@expo/vector-icons';
import circle from '../../assets/img/circle.png'
import { FadeAnimation } from '../../components/FadeAnimation';
import dots from '../../assets/img/dots.png';
import { Load } from '../../components/Load';

type RouteParams = {
    pokemonId: number
}

interface IAttributes {
    base_stat: number;
    stat: {
      name: string;
    };
  }
  
  interface IAbilitys {
    ability: {
      name: string;
    };
  }

type TypeName =  | 'grass'
| 'fire'
| 'water'
| 'poison'
| 'normal'
| 'bug'
| 'flying'
| 'electric'
| 'ground'
| 'dark'
| 'dragon'
| 'fairy'
| 'fighting'
| 'ghost'
| 'ice'
| 'psychic'
| 'rock'
| 'steel';


type PokemonTypes = {
    type: {
      name:TypeName
    };
  };

type PokemonProps = {
    id: number;
    name: string;
    stats: IAttributes[];
    abilities: IAbilitys[];
    types: PokemonTypes[];
    color: string;
};
  

export function About() {
    const route = useRoute();
    const { colors } = useTheme();

    const {pokemonId} = route.params as RouteParams
    const { goBack } = useNavigation()

    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [load, setLoad] = useState<boolean>(true);

    useEffect(() => {
        async function getPokemonDetail() {
            try {
                const response = await api.get(`/pokemon/${pokemonId}`);
                const {stats, abilities, id, name, types} = response.data;

                const currentType = types[0].type.name as TypeName;
                const color = colors.backgroundCard[currentType];

                setPokemon({
                    stats,
                    abilities,
                    id,
                    name,
                    types,
                    color,
                  });
            } catch (err) {
                Alert.alert('Ops, ocorreu algum erro')
            } finally {
                setLoad(false);
            }
        }

        getPokemonDetail();
    }, []);
    
    function handleGoBack() {
        goBack();
    }

    return (
        <>
            {load ? <Load /> :
                <ScrollView>
                <Header type={pokemon.types[0].type.name}>
                    <BackButton onPress={handleGoBack}>
                        <Feather name='chevron-left' size={24} color='#fff' />
                    </BackButton>

                    <ContentImage>
                        <CircleImage source={circle} />
                            <FadeAnimation>
                                <PokemonImage source={{
                                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
                                }} />
                                </FadeAnimation>
                    </ContentImage>

                    <Content>
                        <PokemonId>#{pokemon.id}</PokemonId>
                        <PokemonName>{pokemon.name}</PokemonName>

                        <PokemonTypeContainer>
                            {pokemon.types.map(({type}) => 
                                <PokemonType type={type.name} key={type.name}>
                                    <PokemonTypeText>{type.name}</PokemonTypeText>
                                </PokemonType>
                            )}
                        </PokemonTypeContainer>
                    </Content>
                    <DotsImage source={dots}/>
                </Header>

                <Container>
                    <Title type={pokemon.types[0].type.name}>Base Stats</Title>

                    {pokemon.stats.map(attribute => (
                        <StatusBar key={attribute.stat.name}>
                            <Attributes> { attribute.stat.name } </Attributes>
                            <AttributesNumber>{ attribute.base_stat }</AttributesNumber>

                            <ContentBar>
                                <ProgressBar 
                                    type={pokemon.types[0].type.name}
                                    borderWidth={0}
                                    progress={100}
                                    width={attribute.base_stat}
                                    color={pokemon.color}
                                />
                            </ContentBar>
                        </StatusBar>
                    ))}

                    <Title type={pokemon.types[0].type.name}>Abilities</Title>

                    {pokemon.abilities.map(currentAbility => <Ability key={currentAbility.ability.name}>
                        {currentAbility.ability.name}
                    </Ability>)}
                </Container>
            </ScrollView>}
        </>
    )
}