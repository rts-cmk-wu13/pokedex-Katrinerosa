document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const pokemonName = params.get("name");

    if (!pokemonName) {
        console.error("Fejl: Ingen Pokémon i URL'en");
        return;
    }

    console.log("Henter data for:", pokemonName); // Debugging

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fejl: ${response.status} - Pokémon ikke fundet`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetched data:", data); // Debugging

            // Opdaterer HTML med Pokémon data
            document.getElementById("pokemon-name").textContent = data.name;
            document.getElementById("pokemon-image").src = data.sprites.other["official-artwork"].front_default;
            document.getElementById("pokemon-image").alt = data.name;
            document.getElementById("pokemon-type").textContent = `Type: ${data.types.map(type => type.type.name).join(", ")}`;
            document.getElementById("pokemon-height").textContent = `Height: ${data.height / 10} m`;
            document.getElementById("pokemon-weight").textContent = `Weight: ${data.weight / 10} kg`;

            // Nye stats
            document.getElementById("pokemon-hp").textContent = `HP: ${data.stats.find(stat => stat.stat.name === "hp").base_stat}`;
            document.getElementById("pokemon-atk").textContent = `Attack: ${data.stats.find(stat => stat.stat.name === "attack").base_stat}`;
            document.getElementById("pokemon-def").textContent = `Defense: ${data.stats.find(stat => stat.stat.name === "defense").base_stat}`;
            document.getElementById("pokemon-satk").textContent = `Special Attack: ${data.stats.find(stat => stat.stat.name === "special-attack").base_stat}`;
            document.getElementById("pokemon-sdef").textContent = `Special Defense: ${data.stats.find(stat => stat.stat.name === "special-defense").base_stat}`;
            document.getElementById("pokemon-spd").textContent = `Speed: ${data.stats.find(stat => stat.stat.name === "speed").base_stat}`;
        })
        .catch(error => {
            console.error("Fejl ved hentning af Pokémon-data:", error);
            alert("Kunne ikke hente Pokémon-data. Se konsollen for detaljer.");
        });
});
