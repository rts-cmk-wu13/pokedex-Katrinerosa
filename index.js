document.addEventListener("DOMContentLoaded", () => {
    let sectionElm = document.createElement("section");
    sectionElm.classList.add("pokelist");

    let headerElm = document.createElement("header");
    sectionElm.appendChild(headerElm);

    headerElm.innerHTML = `
        <div class="topbox">
            <h1><img src="pokeball.svg" alt=""> Pokédex</h1>
            <div class="head__flex">
                <div class="search-box">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" id="search" name="search" placeholder="Search">
                </div>
                <div class="hashtag">
                    <a class="roedhash" href="#">#</a>
                </div>
            </div>
        </div>
    `;

    document.querySelector("main").appendChild(sectionElm);

    let offset = 0; // Start ved Pokémon nr. 0
    const limit = 20; // Hent 20 Pokémoner ad gangen
    let isFetching = false; // Forhindrer dobbelt-requests

    const divElm = document.createElement("div");
    divElm.classList.add("div_flex");
    sectionElm.appendChild(divElm);

    function fetchPokemons() {
        if (isFetching) return; // Undgå flere requests på én gang
        isFetching = true;

        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                data.results.forEach(pokemon => {
                    let id = pokemon.url.split("/").slice(-2, -1)[0];

                    let pokemonHTML = `
                        <div class="roed__baggrund">
                            <a href="detail.html?name=${pokemon.name}">
                                <article>
                                    <div class="poke_flex">
                                        <div class="pokebaggrund">
                                            <div class="baggrund__poke">
                                                <p>#${id}</p>
                                                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${pokemon.name}">
                                                <h2>${pokemon.name}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        </div>
                    `;
                    divElm.insertAdjacentHTML("beforeend", pokemonHTML);
                });

                offset += limit; // Opdater offset for næste batch
                isFetching = false;
            })
            .catch(error => {
                console.error("Fejl ved hentning af Pokémon-data:", error);
                isFetching = false;
            });
    }

    // **Scroll event listener**
    window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            fetchPokemons(); // Hent flere Pokémoner, når man scroller ned
        }
    });

    // **Hent første batch af Pokémoner**
    fetchPokemons();
});
