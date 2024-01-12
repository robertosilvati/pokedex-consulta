const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (APIResponse.ok) {
            const data = await APIResponse.json();
            return data;
        } else {
            console.error(`Erro na requisição: ${APIResponse.status}`);
            return null;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        return null;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        // Verifica se data.id é maior ou igual a 649
        if (data.id >= 649) {
            // Aplica o estilo para data.id >= 649
            pokemonImage.classList.add('pokemon__image2');
        } else {
            // Remove a classe para voltar ao estilo padrão
            pokemonImage.classList.remove('pokemon__image2');
        }

        // Define a imagem com base na condição
        if (data.id > 0 && data.id < 649) {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        } else if (data.id >= 649) {
            pokemonImage.src = data['sprites']['front_default'];
        }

        input.value = "";
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Sem Resultado';
        pokemonNumber.innerHTML = "";
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = "";
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);
