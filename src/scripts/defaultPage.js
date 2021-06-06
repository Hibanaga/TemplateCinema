import refs from "./refs";

// //import class Select film
// import SelectFilm from "./selectFilm";

//import Class Films
import Pagination from "./pagination";

//import favorites class
import Favorites from "./favorites";

//import Search Film class
import SearchFilm from "./searchFilm";

export default class DefaultPage {
  constructor(urn, APIKEY) {
    this.urn = urn;
    this.API_KEY = APIKEY;
  }

  displayMainPage() {
    refs.mainLogoTag.addEventListener(
      "click",
      this.actionClickLogoTag.bind(this)
    );
  }

  displayMainHeader() {
    refs.navTag.innerHTML = ``;

    let btn = document.createElement("button");
    btn.classList.add("js-btn-toggleSearch");
    refs.navTag.append(btn);

    let ul = document.createElement("ul");
    ul.classList.add("menu");

    let liWatched = document.createElement("li");
    liWatched.classList.add("liItemMenu");
    liWatched.classList.add("activeLiItemMenu");
    liWatched.classList.add("homeItemNav");
    liWatched.innerText = `Home`;
    ul.append(liWatched);

    let liQueue = document.createElement("li");
    liQueue.classList.add("liItemMenu");
    liQueue.classList.add("libraryItemNav");
    liQueue.innerText = `Library`;
    ul.append(liQueue);

    refs.navTag.append(ul);

    //animation toggle nav item menu
    this.changeToggleActiveNav();

    //animation search input hide/show
    this.animationToggleHeaderNav();

    //show page library
    this.actionShowLibrary();

    //show page home
    this.actionShowHome();
  }

  animationToggleHeaderNav() {
    document
      .querySelector(".js-btn-toggleSearch")
      .addEventListener("click", (event) => {
        refs.hiddenSearch.classList.toggle("toggleHiddenInputSearch");
      });
  }

  changeToggleActiveNav() {
    document.querySelector(".menu").addEventListener("click", (event) => {
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
    });
  }

  showMainContent() {
    if (document.querySelector(".wrap")) {
      document.querySelector(".wrap").classList.add("activePreloader");
    }

    new Pagination(this.urn).init();
  }

  actionShowLibrary() {
    document
      .querySelector(".libraryItemNav")
      .addEventListener("click", this.showLibraryAction.bind(this));
  }

  actionShowHome() {
    document
      .querySelector(".homeItemNav")
      .addEventListener("click", this.showHomePage.bind(this));
  }

  showHomePage() {
    new Pagination(this.urn).init();

    document.querySelector(".wrap").classList.add("activePreloader");
  }

  showLibraryAction() {
    new Favorites().init();
  }

  actionSearchFilm(event) {
    let queryString = document.querySelector(".js-input-searchFilm").value;

    new SearchFilm(queryString, this.API_KEY).init();
  }

  searchFilmQuery() {
    document
      .querySelector(".js-btn-search")
      .addEventListener("click", this.actionSearchFilm.bind(this));
  }

  actionClickLogoTag(event) {
    this.displayMainHeader();
    this.showMainContent();
  }

  init() {
    this.actionClickLogoTag();
    this.displayMainPage();

    //show query string of input search
    this.searchFilmQuery();
  }
}
