import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination';
import { useLoaderData } from 'react-router-dom';
import { Form } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 15);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name ?? '');
  }, [name]);

  useEffect(() => {
    setPokemonType(type ?? '');
  }, [type]);

  return (
    <div className="w-full p-5">
      <h2 className="text-red-600 font-semibold text-3xl text-center my-5">
        Welcome <span className="italic">{user}!</span>, choose your favorite Pokemon!
      </h2>

      <div>
        <Form className="my-4">
          <h3 className="text-xl font-semibold mb-2 text-center text-red-600">
            Filter for Search
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row gap-3 my-2">
              <input
                type="text"
                name="pokemon_name"
                className="w-full md:w-72 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                placeholder="Enter Pokémon name"
                value={pokemonName}
                onChange={handleNameChange}
              />
              <select
                name="pokemon_type"
                className="w-full md:w-72 h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline capitalize"
                value={pokemonType}
                onChange={handleTypeChange}
              >
                <option value="">All</option>
                {types.map((type) => (
                  <option key={type.url} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto h-10 px-5 py-2 bg-red-600 text-white text-base font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
            >
              Search
            </button>
          </div>
        </Form>
      </div>
      <div className="flex justify-center my-5">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={`text-xs mx-1 rounded-xl p-1 ${
              pokemonsPagination.currentPage === page
                ? 'bg-red-500 text-white border border-red-500'
                : 'bg-white text-gray-900 border border-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto md:gap-1">
        {pokemonsPagination.listSlice.map((pokemon) => (
          <div className="w-64 h-96 mx-auto">
            <PokemonCard key={pokemon.url} pokemonData={pokemon} />
          </div>
        ))}
      </section>
      <div className="flex justify-center my-5">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={`text-xs mx-1 rounded-xl p-1 ${
              pokemonsPagination.currentPage === page
                ? 'bg-red-500 text-white border border-red-500'
                : 'bg-white text-gray-900 border border-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
