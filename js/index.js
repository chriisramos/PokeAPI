let url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
let nextUrl;
let prevUrl;
const next = document.querySelector("#btn-next");
const prev = document.querySelector("#btn-prev");

const printError = function (error) {
  document.querySelector("#missatge-error").textContent = error.message;
};

const getPokemonList = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    printError(error);
  }
};

const getPokemon = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    printError(error);
  }
};

const loadPokemons = async () => {
  const data = await getPokemonList(url);
  if (!data) {
    return;
  }
  nextUrl = data.next;
  prevUrl = data.previous;
  prev.disabled = prevUrl === null;
  next.disabled = nextUrl === null;

  const promises = [];

  for (const pokemon of data.results) {
    promises.push(getPokemon(pokemon.url));
  }

  const pokemons = await Promise.all(promises);
  printCards(pokemons);
  
};

const printCards = (pokemons) => {
  const cardContainer = document.querySelector("#llista-pokemons");
  cardContainer.replaceChildren();

  for (const pokemon of pokemons) {
    if (!pokemon) {
      continue;
    }

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name + " img";

    const h3 = document.createElement("h3");
    h3.textContent = pokemon.name;

    const button = document.createElement("button");
    button.classList.add("boto-detall");
    button.textContent = "Detall";
    button.addEventListener("click", () => {
      location.href = `detail.html?name=${pokemon.name}`;
    });

    card.append(img, h3, button);
    cardContainer.append(card);
  }
};

const results = document.querySelector("#num-resultats");
results.addEventListener("change", (event) => {
  url = `https://pokeapi.co/api/v2/pokemon?limit=${event.target.value}&offset=0`;
  loadPokemons();
});

next.addEventListener("click", () => {
  url = nextUrl;
  loadPokemons();
});

prev.addEventListener("click", () => {
  url = prevUrl;
  loadPokemons();
});

loadPokemons();
