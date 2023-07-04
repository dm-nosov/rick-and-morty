const pagination = document.querySelector('[data-js="pagination"]');

export function updateNavigationPages(currentPage, maxPages) {
  pagination.textContent = `${currentPage} / ${maxPages}`;
}

export function getCharacterQuery(page, searchQuery) {
  return `?page=${page}&name=${searchQuery}`;
}
