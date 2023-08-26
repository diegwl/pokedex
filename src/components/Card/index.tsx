import React from 'react'
import dotsImage from '../../assets/img/dots.png';
import pokeball from '../../assets/img/pokeballCard.png'
import { 
    PokemonCard,
    LeftSide,
    RightSide, 
    PokemonId, 
    PokemonName, 
    ImageCardDetailLeftSide, 
    PokemonContentType, 
    PokemonType, 
    PokemonTypeText, 
    PokemonImage,
    PokeballDetail,
} from './styles'
import { TouchableOpacityProps } from 'react-native';
import { FadeAnimation } from '../FadeAnimation';

export type PokemonType = {
    type: {
        name: string;
    }
}

export type Pokemon = {
    name: string;
    url: string;
    id: number;
    types: PokemonType[];
}

type Props = {
    data: Pokemon;
} & TouchableOpacityProps;

export function Card({data, ...rest}: Props) {
    return (
        <PokemonCard type={data.types[0].type.name} {...rest}>
            <LeftSide>
                <PokemonId>#{data.id}</PokemonId>
                <PokemonName>{data.name}</PokemonName>
                <ImageCardDetailLeftSide source={dotsImage} />

                <PokemonContentType>
                    {data.types.map(pokemonType => 
                    <PokemonType key={pokemonType.type.name} type={pokemonType.type.name}>
                        <PokemonTypeText key={pokemonType.type.name}>
                            {pokemonType.type.name}
                        </PokemonTypeText>
                    </PokemonType>
                    )}
                    
                </PokemonContentType>
            </LeftSide>

            <RightSide>
                <PokeballDetail source={pokeball} />
                <FadeAnimation>
                <PokemonImage source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
                }} />
                </FadeAnimation>
            </RightSide>
            
        </PokemonCard>
    )
}