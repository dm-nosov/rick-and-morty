export function createSearchBar(onSubmitCallback, onInputCallback) {
  const searchForm = document.createElement("form");

  searchForm.addEventListener("submit", onSubmitCallback);

  searchForm.classList = "search-bar";

  const searchInput = document.createElement("input");

  searchInput.addEventListener("input", onInputCallback);

  searchInput.classList = "search-bar__input";
  searchInput.setAttribute("placeholder", "search characters");
  searchInput.setAttribute("aria-label", "character name");
  searchInput.type = "text";
  searchForm.append(searchInput);

  const submit = document.createElement("button");
  submit.classList = "search-bar__button";
  submit.setAttribute("aria-label", "search for character");

  const submitImg = document.createElement("img");
  submitImg.classList = "search-bar__icon";
  submitImg.src = "assets/magnifying-glass.png";
  submitImg.alt = "";
  submit.append(submitImg);

  searchForm.append(submit);
  return searchForm;
}
