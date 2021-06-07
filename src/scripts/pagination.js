import refs from "./refs";
import * as _ from "lodash";
// import "../styles/paginationStyle.scss";
import FilmsTrend from "./trendsFilms";

//request to API
import axios from "axios";

import paginationTemplate from "../template/paginationTemplate.hbs";

export default class Pagination {
  #currentPage = 1;

  constructor(urn) {
    this.urn = urn;
  }

  fetchingData() {
    axios(this.urn + this.#currentPage).then((data) => {
      let { page, results, total_pages } = data.data;

      this.createPagination({ page, total_pages });
      new FilmsTrend(results).init();
    });
  }

  prevBtnAction(event) {
    this.#currentPage -= 1;
    this.fetchingData();
  }

  nextBtnAction(event) {
    this.#currentPage += 1;
    this.fetchingData();
  }

  getInputAction(event) {
    if (event.target.value > 1000) {
      event.target.value = 1000;
    }

    if (event.target.value === "") {
      event.target.value = 1;
    }

    this.#currentPage = event.target.value;

    this.fetchingData();
  }

  eventListeners() {
    document
      .querySelector(".js-btn-prev")
      .addEventListener("click", this.prevBtnAction.bind(this));

    document
      .querySelector(".js-btn-next")
      .addEventListener("click", this.nextBtnAction.bind(this));

    document
      .querySelector(".js-input-searchPage")
      .addEventListener(
        "input",
        _.debounce(this.getInputAction.bind(this), 1000)
      );
  }

  //validatePagination
  validatePagination() {
    if (this.#currentPage <= 1) {
      document.querySelector(".js-btn-prev").setAttribute("disabled", true);
    } else {
      document.querySelector(".js-btn-prev").setAttribute("editable", true);
    }

    if (Number(this.#currentPage) === 1000) {
      document.querySelector(".js-btn-next").setAttribute("disabled", true);
    } else {
      document.querySelector(".js-btn-next").setAttribute("editable", true);
    }
  }

  //create Pagination
  createPagination(pageInfo) {
    //display the pagination to DOM
    let markup = paginationTemplate(pageInfo);
    refs.paginationDOM.innerHTML = markup;

    //validate
    this.validatePagination();
    //add eventListeners
    this.eventListeners();
  }

  init() {
    // this.createPagination();
    this.fetchingData();
  }
}
