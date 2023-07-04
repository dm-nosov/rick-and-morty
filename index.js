import { createCharacterCard } from "./components/card/card.js";
import {
  updatePagination,
  getCharacterQuery,
  createPagination,
} from "./components/nav-pagination/nav-pagination.js";
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
navigationContainer.append(prevButton);
navigationContainer.append(pagination);
navigationContainer.append(nextButton);

searchBarContainer.append(
  createSearchBar(
    async (event) => {
      event.preventDefault();
      await fetchCharacters();
    },
    (event) => {
      searchQuery = event.target.value;
    }
  )
);

// Fetch functions

const API_BASE = "https://rickandmortyapi.com/api/character";

function getMaxPage(data) {
  return data.info.pages;
}

async function fetchCharacters() {
  const QUERY = getCharacterQuery(page, searchQuery);
  console.log("QUERY", QUERY);
  const data = await (await fetch(API_BASE + QUERY)).json();
  if (data.hasOwnProperty("error")) {
    return alert(data.error);
  }
  maxPage = getMaxPage(data);
  const charactersData = data.results;
  cardContainer.innerHTML = "";
  charactersData.forEach((item) => {
    cardContainer.innerHTML += createCharacterCard(item);
  });
  updatePagination(pagination, page, maxPage);
}

await fetchCharacters();
