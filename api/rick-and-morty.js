const API_BASE = "https://rickandmortyapi.com/api/character";

export function getCharacterQuery(page, searchQuery) {
  return `?page=${page}&name=${searchQuery}`;
}

export async function getCharactersData(page, searchQuery) {
  const QUERY = getCharacterQuery(page, searchQuery);
  const data = await (await fetch(API_BASE + QUERY)).json();
  return data;
}

export function getMaxPage(data) {
  return data.info.pages;
}

export function getCharacters(data) {
  return data.results;
}
