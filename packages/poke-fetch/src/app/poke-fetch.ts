import type { Pokedex, Pokemon } from './types';
import { getData } from './getData';
import { writeFileSync } from 'fs';

export default async function main() {
  const pokedexUrl = 'https://pokeapi.co/api/v2/pokedex';
  const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
  const [sinnohPokedex, pokedexFail] = await getData<Pokedex>(
    `${pokedexUrl}/6`
  );
  const hasPokedexErr = pokedexFail !== null;

  if (hasPokedexErr) {
    console.log('failed to get pokedex');
    return console.error(pokedexFail);
  }

  const pokemonUrls = sinnohPokedex['pokemon_entries'].map(
    (entry) => entry['pokemon_species'].url
  );

  const pokemonIds = pokemonUrls
    .map((url) => url.split('/').filter(Boolean)[0])
    .filter(Boolean) as string[];

  const pokemonResponses = await Promise.all(
    pokemonIds.map((id) => getData<Pokemon>(`${pokemonUrl}/${id}`))
  );

  const pokemon = pokemonResponses.map((response) => response[0]);

  const essentialData = pokemon.map((pokemon) => ({
    name: pokemon.name,
    types: pokemon.types.map((type) => type.type.name),
    id: pokemon.id,
    sprite: pokemon.sprites['front_default'],
  }));

  writeFileSync(
    'sinnohPokemon.json',
    new TextEncoder().encode(JSON.stringify(essentialData))
  );
}

main();
