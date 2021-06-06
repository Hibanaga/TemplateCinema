import axios from "axios";
import refs from "./refs";

import Preloader from "./preloader";

//current film template
import currentFilmCard from "../template/currentFilmCard.hbs";

//list of names genres
const API_KEY = `a0954edce1669bd21c76fe63f43c7ba1`;
const URNGenre = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

export default class CurrentFilmPage {
  constructor(dataFilm) {
    this.dataFilm = dataFilm;
  }

  fetchGenres() {
    return axios(URNGenre).then((data) => data.data.genres);
  }

  validatePromises() {
    Promise.all([this.fetchGenres(), this.dataFilm]).then((data) => {
      this.currentFilmCard(data);
    });
  }

  currentFilmCard(allGenres) {
    let [genresList, filmsData] = allGenres;

    let filmsDataArr = [];
    filmsDataArr.push(filmsData);

    document.querySelector(".wrap").classList.add("activePreloader");
    refs.mainContent.innerHTML = ``;
    refs.paginationDOM.innerHTML = ``;

    document.querySelector(".homeItemNav").classList.remove("activeLiItemMenu");

    filmsDataArr.map(
      ({ title, poster_path, vote_average, genre_ids, overview }) => {
        let newTitle = ``;

        if (title.length > 12) {
          newTitle = this.validateTitles(title);
        } else if (title.length < 12) {
          newTitle = title;
        }

        let markup = currentFilmCard({
          title,
          changedTitle: newTitle,
          poster_path,
          vote_average,
          overview,
          genre_ids: () => {
            let genresNamesArr = [];
            genresList.map(({ id, name }) => {
              genre_ids.map((item) => {
                if (genresNamesArr.length <= 2) {
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
  }

  validateTitles(title) {
    return `${title.substring(0, 12)}...`;
  }

  init() {
    new Preloader().init();

    this.validatePromises();
  }
}
