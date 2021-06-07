import "../styles/style.scss";

import aboutInfo from "../assets/about.json";

//Animation header //doesn't need all in class Default Page
// import { tagsActionMenu, toggleHiddenInput } from "./animation";

// //all refs to DOM //usage to another files
// import refs from "./refs";

// //import Class Films //pagination realize in class Default Page
// import Pagination from "./pagination";

//import class Select film
import SelectFilm from "./selectFilm";

//import Default Page
import DefaultPage from "./defaultPage";
import refs from "./refs";

import About from "./aboutInfo";

//toggle animation
// refs.swithSearch.addEventListener("click", toggleHiddenInput);

//active tag animation
// refs.menuNav.addEventListener("click", tagsActionMenu);

const API_KEY = `a0954edce1669bd21c76fe63f43c7ba1`;
const URNTrend = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=`;
// const imgURI = `http://image.tmdb.org/t/p/w500`;

// title: "Cruella"
//  poster(poster_path): /hjS9mH8KvRiGHgjk6VUZH7OT0Ng.jpg
// genre_ids:  [35, 80] need request to API
// rating (vote_average): 8.8
// http://image.tmdb.org/t/p/w500

// new Pagination(URNTrend).init();

// refs.libraryNav.addEventListener("click", (event) => new Favorites().init());

// creating all logig
new DefaultPage(URNTrend, API_KEY).init();

//logic add film to local storage
new SelectFilm().init();

//login creating about page
new About(aboutInfo).init();
