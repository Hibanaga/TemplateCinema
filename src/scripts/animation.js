import refs from "./refs";

export function tagsActionMenu(event) {
  if (event.target.nodeName !== "LI") {
    return;
  }
  let currentActiveItem =
    event.currentTarget.querySelector(".activeLiItemMenu");

  if (currentActiveItem) {
    currentActiveItem.classList.remove("activeLiItemMenu");
  }
  let nextActiveItem = event.target;
  nextActiveItem.classList.add("activeLiItemMenu");
}

export function toggleHiddenInput(event) {
  refs.hiddenSearch.classList.toggle("toggleHiddenInputSearch");
}
