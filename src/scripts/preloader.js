import refs from "./refs";

import "../styles/preloaderStyles.scss";

export default class Preloader {
  constructor() {}

  createPreloader() {
    let divWrap = document.createElement("div");
    divWrap.classList.add("wrap");

    let divLoader = document.createElement("div");
    divLoader.classList.add("loading");
    divWrap.append(divLoader);

    let divBounce = document.createElement("div");
    divBounce.classList.add("bounceball");
    divLoader.append(divBounce);

    let divText = document.createElement("div");
    divText.classList.add("text");
    divText.innerText = `NOW LOADING`;
    divLoader.append(divText);

    return divWrap;
  }

  eventListeners() {
    document.querySelector(".containerMain").append(this.createPreloader());
  }

  init() {
    this.eventListeners();
  }
}
