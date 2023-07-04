import { createCharacterCard } from "./components/card/card.js";
import {
  updatePagination,
  createPagination,
} from "./components/nav-pagination/nav-pagination.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import {
  getCharactersData,
  getMaxPage,
  getCharacters,
} from "./api/rick-and-morty.js";

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

const pagination = createPagination(maxPage);
navigationContainer.append(prevButton);
navigationContainer.append(pagination);
navigationContainer.append(nextButton);

searchBarContainer.append(
  createSearchBar(async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    searchQuery = formData.query;
    await fetchCharacters();
  })
);

// Fetch functions

async function fetchCharacters() {
  const data = await getCharactersData(page, searchQuery);
  if (data.hasOwnProperty("error")) {
    return alert(data.error);
  }
  maxPage = getMaxPage(data);
  const characters = getCharacters(data);

  cardContainer.innerHTML = "";
  characters.forEach((item) => {
    cardContainer.innerHTML += createCharacterCard(item);
  });
  updatePagination(pagination, page, maxPage);
}

await fetchCharacters();
