import { createCharacterCard } from "./components/card/card.js";
import {
  updateNavigationPages,
  getCharacterQuery,
} from "./components/nav-pagination/nav-pagination.js";
updateNavigationPages;

import { createButton } from "./components/nav-button/nav-button.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const query = document.querySelector('[data-js="query"]');
const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

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

const pagination = createPagination(page, maxPage);
navigation.append(prevButton);
navigation.append(pagination);
navigation.append(nextButton);

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  searchQuery = query.value;
  await fetchCharacters();
});

// Fetch functions

const API_BASE = "https://rickandmortyapi.com/api/character";

async function getMaxPage(data) {
  return data.info.pages;
}

async function fetchCharacters() {
  const QUERY = getCharacterQuery(page, searchQuery);
  console.log("QUERY", QUERY);
  const data = await (await fetch(API_BASE + QUERY)).json();
  maxPage = await getMaxPage(data);
  const charactersData = data.results;
  cardContainer.innerHTML = "";
  charactersData.forEach((item) => {
    cardContainer.innerHTML += createCharacterCard(
      item.image,
      item.name,
      item.status,
      item.type,
      item.episode.length,
      item.gender
    );
  });
  updateNavigationPages(pagination, page, maxPage);
}

await fetchCharacters();
