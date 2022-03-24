import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';

const controlRecipe = async function () {
  try {
    const id = `5ed6604591c37cdc054bcd09`;

    // load recipe
    await model.loadRecipe(id);
  } catch (err) {
    console.log(err);
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
