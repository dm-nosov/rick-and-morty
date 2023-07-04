import { createCharacterCard } from "./components/card/card.js";
import {
  updateNavigationPages,
  getCharacterQuery,
} from "./components/nav-pagination/nav-pagination.js";
updateNavigationPages;

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const query = document.querySelector('[data-js="query"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

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
  updateNavigationPages(page, maxPage);
}

await fetchCharacters();

prevButton.addEventListener("click", async () => {
  if (page > 1) {
    page--;
    await fetchCharacters();
  }
});

nextButton.addEventListener("click", async () => {
  if (page < maxPage) {
    page++;
    await fetchCharacters();
  }
});

searchBar.addEventListener("submit", async (event) => {
  event.preventDefault();
  searchQuery = query.value;
  await fetchCharacters();
});
