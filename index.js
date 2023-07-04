import { createCharacterCard } from "./components/card/card.js";
import { updateNavigationPages } from "./components/nav-pagination/nav-pagination.js";
updateNavigationPages;

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
const page = 1;
const searchQuery = "";

// Fetch functions

const CHARACTERS = `https://rickandmortyapi.com/api/character?page=${page}`;

async function getMaxPage() {
  const data = await (await fetch(CHARACTERS)).json();
  return data.info.pages;
}

maxPage = await getMaxPage();

updateNavigationPages(pagination, page, maxPage);

async function fetchCharacters() {
  const data = await (await fetch(CHARACTERS)).json();
  return data.results;
}
const charactersData = await fetchCharacters();
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
