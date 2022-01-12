const generateRandomNumbers = (min = 1, max = 150) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const fetchPokemon = () => {
  const promises = [];
  console.log(00);
  const pokemons = Array.from({ length: 4 }, (_) => generateRandomNumbers());
  pokemons.forEach((id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    promises.push(fetch(url).then((res) => res.json()));
  });

  Promise.all(promises).then((results) => {
    othersPokemons(results);
  });
};

const othersPokemons = (pokemons) => {
  const other_pokemons = document.getElementById("other-pokemons");
  const pokemonHTMLString = pokemons.map(({ name, sprites }) => {
    const img =
      sprites?.other?.dream_world?.front_default || sprites.front_default;
    return `<button class="footer-container__buttons--hover">
          <img src="${img}" alt="${name}">
    </button>`;
  });
  other_pokemons.innerHTML = pokemonHTMLString.join("");
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  return pokemon;
};

// get pokemon charizard
getPokemonMain = async () => {
  const pokemonMain = await getPokemon("charizard");
  const {
    id,
    name,
    sprites,
    types,
    base_experience,
    abilities,
    weight,
    height,
  } = pokemonMain;

  //name pokemon
  const title_pokemon = document.getElementById("title-pokemon");
  title_pokemon.innerText = name;

  //img pokemon
  const img =
    sprites?.other?.dream_world?.front_default || sprites.front_default;
  const img_pokemon = document.getElementById("img-pokemon");
  img_pokemon.src = img;

  //id pokemon
  const id_pokemon = document.getElementById("id-pokemon");
  id_pokemon.innerText = id;

  //weight pokemon
  const weight_pokemon = document.getElementById("weight-pokemon");
  weight_pokemon.innerText = weight;

  //height pokemon
  const height_pokemon = document.getElementById("height-pokemon");
  height_pokemon.innerText = height;

  //base_experience pokemon
  const base_experience_pokemon = document.getElementById(
    "base-experience-pokemon"
  );
  base_experience_pokemon.innerText = base_experience;

  //abilities pokemon
  const abilities_pokemon = document.getElementById("habilities-pokemon");
  abilities_pokemon.innerText = abilities
    .map((ha) => ha.ability.name)
    .join(", ");

  //types pokemon
  const types_pokemon = document.getElementById("types-pokemon");
  types_pokemon.innerText = types.map((tp) => tp.type.name).join(", ");
};

fetchPokemon();
getPokemonMain();
