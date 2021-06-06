import refs from "./refs";

import * as _ from "lodash";

export default class SelectFilm {
  constructor() {}

  selectWatched(event) {
    if (event.target.nodeName !== "BUTTON") {
      return;
    }

    if (event.target.classList.contains("js-btn-watched")) {
      if (event.target.classList.contains("btnActiveWatched")) {
        this.deleteLocalStorageWatched(event, event.target.dataset.source);
      } else {
        event.target.classList.add("btnActiveWatched");
        //   let splitedDataSetValue = event.target.dataset.source.split("-");
        this.addLocalStorageWatched(event.target.dataset.source);
      }
    }

    if (event.target.classList.contains("js-btn-queue")) {
      if (event.target.classList.contains("btnActiveQueue")) {
        this.deleteLocalStorageQueue(event, event.target.dataset.source);
      } else {
        event.target.classList.add("btnActiveQueue");
        this.addLocalStorageQueue(event.target.dataset.source);
      }
    }
  }

  addLocalStorageWatched(dataFilm) {
    if (localStorage.getItem("watched") !== "") {
      let watchedInfo = localStorage.getItem("watched");

      localStorage.setItem("watched", `${dataFilm}|${watchedInfo}`);
    }
  }

  addLocalStorageQueue(dataFilm) {
    if (localStorage.getItem("queue") !== "") {
      let watchedInfo = localStorage.getItem("queue");

      localStorage.setItem("queue", `${dataFilm}|${watchedInfo}`);
    }
  }

  deleteLocalStorageWatched(event, dataFilm) {
    event.target.classList.remove("btnActiveWatched");
    let localStorageInfo = localStorage.getItem("watched").split("|");
    let uniqArrStorage = _.uniq(localStorageInfo);

    uniqArrStorage.map((item) => {
      if (item == dataFilm) {
        let idx = uniqArrStorage.indexOf(item);
        uniqArrStorage.splice(idx, 1);
      }
    });

    localStorage.setItem("watched", uniqArrStorage.join("|"));
  }

  deleteLocalStorageQueue(event, dataFilm) {
    event.target.classList.remove("btnActiveQueue");
    let localStorageInfo = localStorage.getItem("queue").split("|");
    let uniqArrStorage = _.uniq(localStorageInfo);

    uniqArrStorage.map((item) => {
      if (item == dataFilm) {
        let idx = uniqArrStorage.indexOf(item);
        uniqArrStorage.splice(idx, 1);
      }
    });

    localStorage.setItem("queue", uniqArrStorage.join("|"));
  }

  eventListeners() {
    refs.mainContent.addEventListener("click", this.selectWatched.bind(this));
  }

  init() {
    this.eventListeners();
  }
}
