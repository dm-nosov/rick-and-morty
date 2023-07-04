import { createCharacterCard } from "./components/card/card.js";
import {
  updateNavigationPages,
  updateCharacterPage,
} from "./components/nav-pagination/nav-pagination.js";
updateNavigationPages;

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

// Fetch functions

const CHARACTERS_API = `https://rickandmortyapi.com/api/character?page=`;

async function getMaxPage() {
  const data = await (await fetch(CHARACTERS_API)).json();
  return data.info.pages;
}

maxPage = await getMaxPage();

async function fetchCharacters() {
  const API_ENDPOINT = updateCharacterPage(CHARACTERS_API, page);
  const data = await (await fetch(API_ENDPOINT)).json();
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
