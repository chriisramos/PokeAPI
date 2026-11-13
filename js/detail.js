const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get("name");

const getPokemonDetail = async (name) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    document.querySelector("#missatge-error").textContent = error.message;
  }
};

const loadDetail = async () => {
    const details = await getPokemonDetail(pokemonName);
    if (!details) return;
    printDetail(details);
};

const printDetail = (pokemon) => {
  document.querySelector("#pokemon-name").textContent = pokemon.name;

  const img = document.querySelector("#pokemon-img");
  img.src = pokemon.sprites.front_default;
  img.alt = pokemon.name + " img";

  document.querySelector("#pokemon-info").textContent =
    `Pes: ${pokemon.weight} | Alçada: ${pokemon.height}`;

  const abilitiesBody = document.querySelector("#abilities-body");
  abilitiesBody.replaceChildren();

  for (const item of pokemon.abilities) {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = item.slot;

    const nameCell = document.createElement("td");
    nameCell.textContent = item.ability.name;

    row.append(idCell, nameCell);
    abilitiesBody.append(row);
  }
};

loadDetail();

const back = document.querySelector("#btn-back");
back.addEventListener("click", () => {
    history.back()
})