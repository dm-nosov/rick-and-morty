export function updateNavigationPages(navElement, currentPage, maxPages) {
  navElement.textContent = `${currentPage} / ${maxPages}`;
}
