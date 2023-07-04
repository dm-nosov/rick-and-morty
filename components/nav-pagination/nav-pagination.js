export function updatePagination(pagination, currentPage, maxPages) {
  pagination.textContent = `${currentPage} / ${maxPages}`;
}

export function createPagination(maxPages) {
  const pagination = document.createElement("span");
  pagination.classList.add("navigation__pagination");
  pagination.textContent = `1 / ${maxPages}`;
  return pagination;
}
