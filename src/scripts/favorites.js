import refs from "./refs";
import * as _ from "lodash";
import filmCard from "../template/filmCard.hbs";

import pagination from "paginationjs";

export default class Favorites {
  constructor() {}

  createNewNav() {
    refs.navTag.innerHTML = ``;

    let divCover = document.createElement("div");
    divCover.classList.add("menuCover");

    let ul = document.createElement("ul");
    ul.classList.add("menu");
    divCover.append(ul);

    let liWatched = document.createElement("li");
    liWatched.classList.add("liItemMenu");
    liWatched.classList.add("activeLiItemMenu");
    liWatched.classList.add("watched");
    liWatched.innerText = `Watched`;
    ul.append(liWatched);

    let liQueue = document.createElement("li");
    liQueue.classList.add("liItemMenu");
    liQueue.classList.add("queue");
    liQueue.innerText = "Queue";
    ul.append(liQueue);

    refs.navTag.append(divCover);

    this.actionToggleMenu();

    this.parsingWatchedData();
  }

  actionToggleMenu() {
    document
      .querySelector(".menuCover")
      .addEventListener("click", this.toggleMenuItem.bind(this));
  }

  parsingWatchedData() {
    let localStorageWatch = localStorage.getItem("watched").split("|");

    // console.log(localStorageWatch);

    // let arrNamesFilms = ["poster_path", "title", "genre_ids", "vote_average"];

    let arrNamesFilms = [
      "poster_path",
      "title",
      "changedTitle",
      "genre_ids",
      "vote_average",
      "overview",
    ];

    let splitedArrObj = localStorageWatch.map((item) => {
      if (item != "null") {
        return _.zipObject(arrNamesFilms, item.split("-"));
      }
    });

    let compactData = _.compact(splitedArrObj);

    this.createPagination(compactData);
    this.eventListener();
  }

  createPagination(data) {
    refs.paginationDOM.innerHTML = ``;

    $(".paginationInfo").pagination({
      dataSource: data,
      pageSize: 6,
      showPrevious: false,
      showNext: false,
      callback: this.callbackPaginationLibrary.bind(this),
    });

    // this.showFilmsStorage(data)
  }

  callbackPaginationLibrary(data, pagination) {
    this.showFilmsStorage(data);
    this.checkerWatched();
    this.checkerQueue();
  }

  parsingQueueData() {
    let localStorageQueue = localStorage.getItem("queue").split("|");

    let arrNamesFilms = [
      "poster_path",
      "title",
      "changedTitle",
      "genre_ids",
      "vote_average",
      "overview",
    ];

    let splitedArrObj = localStorageQueue.map((item) => {
      if (item != "null") {
        return _.zipObject(arrNamesFilms, item.split("-"));
      }
    });

    let compactData = _.compact(splitedArrObj);

    this.createPagination(compactData);
  }

  checkerWatched() {
    let arrayChildNodes = [...refs.mainContent.childNodes];

    if (localStorage.getItem("watched") != null) {
      let storageWatched = localStorage.getItem("watched").split("|");

      arrayChildNodes.map((item) => {
        storageWatched.map((storageItem) => {
          let splitedItemStorage = storageItem.split("-");
          if (item.childNodes[3].innerText == splitedItemStorage[2]) {
            item.childNodes[1].childNodes[3].classList.add("btnActiveWatched");
          }
        });
      });
    }
  }

  checkerQueue() {
    let arrayChildNodes = [...refs.mainContent.childNodes];

    if (localStorage.getItem("queue") != null) {
      let storageWatched = localStorage.getItem("queue").split("|");

      arrayChildNodes.map((item) => {
        // console.log(item.childNodes[3]);
        storageWatched.map((storageItem) => {
          let splitedItemStorage = storageItem.split("-");
          if (item.childNodes[3].innerText == splitedItemStorage[2]) {
            item.childNodes[1].childNodes[5].classList.add("btnActiveQueue");
          }
        });
      });
    }
  }

  showFilmsStorage(data) {
    refs.mainContent.innerHTML = ``;

    data.map((item) => {
      let {
        genre_ids,
        overview,
        title,
        changedTitle,
        poster_path,
        vote_average,
      } = item;

      // console.log(item);

      let markup = filmCard({
        genre_ids,
        overview,
        title,
        changedTitle,
        poster_path,
        title,
        vote_average,
      });

      refs.mainContent.innerHTML += markup;
    });
  }

  validateTitles(title) {
    return `${title.substring(0, 12)}...`;
  }

  toggleMenuItem(event) {
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

  eventListener() {
    let refsFavorite = {
      watched: document.querySelector(".watched"),
      queue: document.querySelector(".queue"),
    };

    refsFavorite.watched.addEventListener(
      "click",
      this.parsingWatchedData.bind(this)
    );
    refsFavorite.queue.addEventListener(
      "click",
      this.parsingQueueData.bind(this)
    );
  }

  init() {
    this.createNewNav();
  }
}
