import axios from "axios";
import refs from "./refs";

import Preloader from "./preloader";

// import FilmsTrend from "./trendsFilms";

import CurrentFilmPage from "./сurrentFilmPage";

export default class SearchFilm {
  #URNrequest = `https://api.themoviedb.org/3/search/movie?language=en-US&page=1&include_adult=false`;

  constructor(requestQuery, API_KEY) {
    this.request = requestQuery;
    this.API_KEY = API_KEY;
  }

  fetchingSearchMovie() {
    let query = `&query=${this.request}`;
    let queryAPI_KEY = `&api_key=${this.API_KEY}`;
    axios(this.#URNrequest + queryAPI_KEY + query).then((data) => {
      // document.querySelector(".wrap").classList.add("activePreloader");
      this.validateRequest(data.data.results);
    });
  }

  validateRequest(data) {
    if (data.length === 0) {
      refs.mainContent.innerHTML = `<h1>Doesn't have results</h1>`;
    } else {
      new CurrentFilmPage(data[0]).init();
    }
  }

  init() {
    this.fetchingSearchMovie();
  }
}
