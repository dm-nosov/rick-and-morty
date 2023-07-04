export function createButton(name, onClick) {
  const button = document.createElement("button");
  button.className =
    name === "previous" ? "button button--prev" : "button button--next";
  button.addEventListener("click", onClick);
  button.textContent = name;
  return button;
}
