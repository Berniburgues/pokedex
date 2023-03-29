import { useEffect, React, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { pokemonColors } from '../services/colors';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const pokemon = await getPokemonById(id);
      setPokemon(pokemon);
    };

    if (!state?.pokemon) loadData();
    else setPokemon(state.pokemon);
  }, []);

  return (
    <>
      {pokemon && (
        <div className="h-auto flex justify-center items-center">
          <article
            className={`shadow-md rounded-lg border-2 border-gray-400 w-auto h-auto m-auto  ${
              pokemonColors[pokemon.types[0].type.name]
            }`}
          >
            <div className="relative">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-auto h-auto mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-900 bg-opacity-75 text-center">
                <h2 className="text-3xl font-bold uppercase text-white">
                  {pokemon.name}
                </h2>
              </div>
            </div>
            <div className="bg-white px-4 py-2">
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm font-semibold text-gray-700 bg-${
                    pokemonColors[pokemon.types[0].type.name]
                  }-400 px-2 py-1 rounded-lg uppercase`}
                >
                  {pokemon.types[0].type.name}
                </p>
                <p className="text-xs font-semibold text-gray-500">{`#${pokemon.id
                  .toString()
                  .padStart(3, '0')}`}</p>
              </div>
              <hr className="my-2 border-gray-400" />
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500">Height</p>
                  <p className="text-sm font-medium">{`${(pokemon.height / 10).toFixed(
                    1,
                  )}m`}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500">Weight</p>
                  <p className="text-sm font-medium">{`${(pokemon.weight / 10).toFixed(
                    1,
                  )}kg`}</p>
                </div>
              </div>
              <hr className="my-2 border-gray-400" />
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500">Attack</p>
                  <p className="text-sm font-medium">
                    {pokemon.stats.find((stat) => stat.stat.name === 'attack').base_stat}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500">Defense</p>
                  <p className="text-sm font-medium">
                    {pokemon.stats.find((stat) => stat.stat.name === 'defense').base_stat}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500">Special Attack</p>
                  <p className="text-sm font-medium">
                    {
                      pokemon.stats.find((stat) => stat.stat.name === 'special-attack')
                        .base_stat
                    }
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-500">Special Defense</p>
                  <p className="text-sm font-medium">
                    {
                      pokemon.stats.find((stat) => stat.stat.name === 'special-defense')
                        .base_stat
                    }
                  </p>
                </div>
              </div>
              <hr className="my-2 border-gray-400" />
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Abilities</p>
                <div className="flex flex-wrap justify-around">
                  {pokemon.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className={`px-2 py-1 text-xs font-semibold text-white rounded-lg ${
                        pokemonColors[pokemon.types[0].type.name]
                      }`}
                    >
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>
              <hr className="my-2 border-gray-400" />
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Moves</p>
                <div className="flex flex-wrap gap-2">
                  {pokemon.moves.slice(0, 10).map((move) => (
                    <span
                      key={move.move.name}
                      className={`px-2 py-1 text-xs font-semibold text-white rounded-lg ${
                        pokemonColors[pokemon.types[0].type.name]
                      }`}
                    >
                      {move.move.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default PokemonDetail;
