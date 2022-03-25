import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import resultsView from './views/ResultsView.js';
import searchView from './views/SearchView.js';
import paginationView from './views/PaginationView.js';
import bookmarksView from './views/BookmarksView.js';

const controlRecipe = async function () {
  if (window.location.hash === '') return;
  try {
    // get recipe ID from URL hash
    const id = window.location.hash.slice(1);

    // show spinner animation until recipe loads
    recipeView.renderSpinner();

    // load recipe
    await model.loadRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    // render error
    recipeView.renderError(err.message);
  }
};

const controlResults = async function () {
  try {
    //get search query
    const query = searchView.getQuery();
    if (!query) return;

    // load recipes
    await model.loadSearchResults(query);

    // render recipes
    resultsView.render(model.getSearchResultsPage());

    // 4) render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err.message);
  }
};

const controlPagination = function (pageGoto) {
  if (pageGoto === 'prev' && model.state.search.page === 1) return;
  pageGoto === 'next' && model.state.search.page++;
  pageGoto === 'prev' && model.state.search.page--;

  // render NEW results
  resultsView.render(model.getSearchResultsPage());

  // render NEW pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update recipe servings and ingredient quantity
  model.updateServings(newServings);

  // update view (without reloading whole page)
  recipeView.render(model.state.recipe);
  // recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  // add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  // recipeView.update(model.state.recipe);
  recipeView.render(model.state.recipe);

  //render bookmarks
  bookmarksView.render(model.state.bookmarks);
  //controlBookmarks();
};

const toggleBookmarks = function () {
  bookmarksView.toggleBookmarks();
};

function init() {
  recipeView.handleHashChangeAndPageLoad(controlRecipe);
  searchView.addHandlerSearch(controlResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerClick(controlServings);
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerBookmarksView(toggleBookmarks);
}
init();
