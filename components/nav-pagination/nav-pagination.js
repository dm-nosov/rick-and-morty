export function updatePagination(pagination, currentPage, maxPages) {
  pagination.textContent = `${currentPage} / ${maxPages}`;
}

export function createPagination(currentPage, maxPages) {
  const pagination = document.createElement("span");
  pagination.classList.add("navigation__pagination");
  pagination.textContent = `${currentPage} / ${maxPages}`;
  return pagination;
}
