const pagination = document.querySelector('[data-js="pagination"]');

export function updateNavigationPages(currentPage, maxPages) {
  pagination.textContent = `${currentPage} / ${maxPages}`;
}

export function updateCharacterPage(apiUrl, newPage) {
  return `${apiUrl}${newPage}`;
}
