import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pokemonColors, pokemonColorsText } from '../services/colors';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const loadPokemon = async () => {
    const pokeInfo = await getPokemonById(pokemonData.url);

    setPokemon(pokeInfo);
  };

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`, { state: { pokemon } });
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article
          className={`shadow-lg rounded-md p-3 border-2 border-black  ${
            pokemonColors[pokemon.types[0].type.name]
          }`}
        >
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-1">
              <div
                className={`absolute border-2 border-black inset-0 rounded-full bg-gradient-to-b from-transparent to-${
                  pokemonColors[pokemon.types[0].type.name]
                } opacity-100`}
              ></div>
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
                className="w-full h-full object-contain rounded-md absolute hover:cursor-pointer"
                onClick={handleClickNavigate}
              />
            </div>
            <div className="bg-white border-2 border-black rounded-xl p-3 my-1 mx-3 md:mx-0 md:max-w-xl text-center">
              <h2
                className={`text-3xl font-bold first-letter:uppercase my-1 font-serif ${
                  pokemonColorsText[pokemon.types[0].type.name]
                }`}
              >
                {pokemon.name}
              </h2>

              <p
                className={`text-base border-2 border-black text-gray-100 first-letter:uppercase w-1/2 mx-auto rounded-full mb-2 font-semibold ${
                  pokemonColors[pokemon.types[0].type.name]
                }`}
              >
                {pokemon.types[0].type.name}
              </p>

              <hr className="my-1 mx-auto w-1/2 border-t border-black" />
              <div className="grid grid-cols-3 gap-1 mt-1">
                {pokemon.stats.map((stat) => (
                  <div
                    key={stat.stat.name}
                    className="flex flex-col flex-grow-0 items-center"
                  >
                    <h3 className="text-sm font-bold text-gray-900 font-sans">
                      {(() => {
                        switch (stat.stat.name) {
                          case 'special-attack':
                            return 'SP. ATK';
                          case 'special-defense':
                            return 'SP. DEF';
                          default:
                            return stat.stat.name.toUpperCase();
                        }
                      })()}
                    </h3>
                    <p className="text-sm font-semibold">{stat.base_stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
