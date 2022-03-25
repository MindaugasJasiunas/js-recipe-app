import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import resultsView from './views/ResultsView.js';
import searchView from './views/SearchView.js';

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
  //get search query
  const query = searchView.getQuery();
  if (!query) return;

  // load recipes
  await model.loadSearchResults(query);

  // render recipes
  resultsView.render(model.state.search.results);
};

function init() {
  recipeView.handleHashChangeAndPageLoad(controlRecipe);
  searchView.addHandlerSearch(controlResults);
}
init();
