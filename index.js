 // Opret sektionselementet
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
                 <a class = "roedhash" href="#">#</a>
             </div>
         </div>
     </div>
 `;

 document.querySelector("main").appendChild(sectionElm);

 fetch("https://pokeapi.co/api/v2/pokemon?limit=9")
   .then(response => response.json())
   .then(data => {
       let divElm = document.createElement("div");
       divElm.classList.add("div_flex");

       divElm.innerHTML = data.results.map(pokemon => {
           // Hent Pokémon ID fra URL'en
           let id = pokemon.url.split("/").slice(-2, -1)[0];
           return `
               <div class="roed__baggrund">
                   <a href="detail.html?name=${pokemon.name}">
                       <article>
                           <div class="poke_flex">
                               <div class="pokebaggrund">
                                   
                                   <div class="baggrund__poke">
                                   <p>#${id}</p> <!-- Pokédex-nummeret -->
                                       <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${pokemon.name}">
                                       <h2>${pokemon.name}</h2>
                                       
                                   </div>
                               </div>
                           </div>
                       </article>
                   </a>
               </div>
           `;
       }).join("");

       sectionElm.appendChild(divElm);
   })
   .catch(error => console.error("Fejl ved hentning af Pokémon-data:", error));

