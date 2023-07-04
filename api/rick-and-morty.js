const API_BASE = "https://rickandmortyapi.com/api/character";

export async function getCharactersData(page, searchQuery) {
  const data = await (
    await fetch(API_BASE + `?page=${page}&name=${searchQuery}`)
  ).json();
  return data;
}

export function getMaxPage(data) {
  return data.info.pages;
}

export function getCharacters(data) {
  return data.results;
}
