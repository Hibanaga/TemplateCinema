import refs from "./refs";

import Preloader from "./preloader";

//list of names genres
const API_KEY = `a0954edce1669bd21c76fe63f43c7ba1`;
const URNGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

//template hbs
import filmCard from "../template/filmCard.hbs";
import currentFilmCard from "../template/currentFilmCard.hbs";

//request to API
import axios from "axios";

//lodash
import * as _ from "lodash";

export default class FilmsTrend {
  constructor(filmsData) {
    this.filmsData = filmsData;
  }

  fetchGenres() {
    return axios(URNGenre).then((data) => data.data.genres);
  }

  validatePromises() {
    Promise.all([this.fetchGenres(), this.filmsData]).then((data) =>
      this.listGenres(data)
    );
  }

  listGenres(allGenres) {
    let [genresList, filmsData] = allGenres;

    refs.mainContent.innerHTML = ``;

    // refs.mainContent.innerHTML = `<h1 class='titlePopular'>Populares Films on this week</h1>`;

    filmsData.map(
      ({ title, poster_path, vote_average, genre_ids, overview }) => {
        let newTitle = ``;

        if (title.length > 12) {
          newTitle = this.validateTitles(title);
        } else if (title.length < 12) {
          newTitle = title;
        }

        let markup = filmCard({
          title: title,
          changedTitle: newTitle,
          poster_path,
          vote_average,
          overview,
          genre_ids: () => {
            let genresNamesArr = [];
            genresList.map(({ id, name }) => {
              genre_ids.map((item) => {
                if (genresNamesArr.length < 2) {
                  if (id === item) {
                    genresNamesArr.push(name);
                  }
                }
              });
            });
            return genresNamesArr.join(",");
          },
        });

        refs.mainContent.innerHTML += markup;
      }
    );

    this.checkerWatched();

    this.checkerQueue();

    this.selectCurrentFilm();
  }

  selectCurrentFilm() {
    document
      .querySelector(".rowMain")
      .addEventListener("click", this.actionClickNameFilm.bind(this));
  }

  actionClickNameFilm(event) {
    if (event.target.nodeName !== "H2") {
      return;
    }
    let valueFilmInfo =
      event.target.parentNode.childNodes[1].childNodes[3].dataset.source;

    let splitedArrDataFilm = valueFilmInfo.split("-");

    let arrNamesFilms = [
      "poster_path",
      "title",
      "changedTitle",
      "genre_ids",
      "vote_average",
      "overview",
    ];

    let zipperArrObjFilm = _.zipObject(arrNamesFilms, splitedArrDataFilm);

    // console.log(zipperArrObjFilm);

    let markup = currentFilmCard(zipperArrObjFilm);

    refs.mainContent.innerHTML = ``;
    refs.paginationDOM.innerHTML = ``;

    refs.mainContent.innerHTML = markup;
  }

  validateTitles(title) {
    return `${title.substring(0, 12)}...`;
  }

  checkerWatched() {
    let arrayChildNodes = [...refs.mainContent.childNodes];

    if (localStorage.getItem("watched") != null) {
      let storageWatched = localStorage.getItem("watched").split("|");

      arrayChildNodes.map((item) => {
        // console.log(item.childNodes[3]);
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

  getNamesGenres(genresList, genresId) {
    let genresNamesArr = [];

    genresList.map(({ id, name }) => {
      genresId.map((item) => {
        if (id === item) {
          genresNamesArr.push(name);
        }
      });
    });
  }

  init() {
    this.validatePromises();
  }
}
