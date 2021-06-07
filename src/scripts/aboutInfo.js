import refs from "./refs";

import cardAbout from "../template/cardAbout.hbs";

export default class About {
  constructor(data) {
    this.about = data;
  }

  eventListeners() {
    refs.linkFooter.addEventListener(
      "click",
      this.createProfilePage.bind(this)
    );
  }

  createProfilePage() {
    this.about.map((item) => {
      let markup = cardAbout(item);

      refs.mainContent.innerHTML = ``;
      refs.paginationDOM.innerHTML = ``;

      refs.mainContent.innerHTML += markup;
    });
  }

  init() {
    this.eventListeners();
  }
}
