import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import resultsView from './views/ResultsView.js';

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
  const query = 'pizza';

  // load recipes
  await model.loadSearchResults(query);

  // render recipes
  resultsView.render(model.state.search.results);
};

function init() {
  recipeView.handleHashChangeAndPageLoad(controlRecipe);
}
init();
