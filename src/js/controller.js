import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/RecipeView.js';

const controlRecipe = async function () {
  //   if (window.location.hash === '') return;
  try {
    // get recipe ID from URL hash
    const id = window.location.hash.slice(1);
    // const id = `5ed6604591c37cdc054bcd09aaaaa`;

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

const controlSearchResults = async function () {
  try {
    const searchQuery = 'pizza';
    // load search results (recipes)
    await model.loadSearchResults(searchQuery);
  } catch (err) {
    console.log(err);
  }
};

controlRecipe();
console.log(model.state.search);
controlSearchResults();
console.log(model.state.search);
