import * as nav from "./components/nav-pagination/nav-pagination.js";
import * as api from "./api/rick-and-morty.js";
import { createCharacterCard } from "./components/card/card.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const navigationContainer = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

// Create navigation elements
const prevButton = createButton("previous", async () => {
  if (page > 1) {
    page--;
    await fetchCharacters();
  }
});

const nextButton = createButton("next", async () => {
  if (page < maxPage) {
    page++;
    await fetchCharacters();
  }
});

const pagination = nav.createPagination(maxPage);
navigationContainer.append(prevButton);
navigationContainer.append(pagination);
navigationContainer.append(nextButton);

searchBarContainer.append(
  createSearchBar(async (event) => {
    event.preventDefault();
    searchQuery = event.target.query.value;
    page = 1;
    await fetchCharacters();
  })
);

// Fetch functions

async function fetchCharacters() {
  const data = await api.getCharactersData(page, searchQuery);
  if (data.hasOwnProperty("error")) {
    return alert(data.error);
  }
  maxPage = api.getMaxPage(data);
  const characters = api.getCharacters(data);

  cardContainer.innerHTML = "";
  characters.forEach((item) => {
    cardContainer.innerHTML += createCharacterCard(item);
  });
  nav.updatePagination(pagination, page, maxPage);
}

await fetchCharacters();
