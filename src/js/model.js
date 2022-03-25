import { RESULTS_PER_PAGE, API_URL, API_KEY } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    // load recipe
    let data = await fetch(`${API_URL}/${id}?key=${API_KEY}`);
    data = await data.json();
    if (data.data === undefined)
      throw new Error('Uh oh. Cannot load recipe. Try again.');
    const { recipe } = data.data;

    // update recipe in state (imports/exports has live connection)
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // check if bookmarked
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err; // re-throw error (handled in controller)
  }
};

export const loadSearchResults = async function (searchQuery) {
  try {
    // reset current page when searching
    state.search.page = 1;

    // set search query
    state.search.query = searchQuery;

    // load recipe
    let data = await fetch(`${API_URL}?search=${searchQuery}`);
    data = await data.json();

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
      };
    });
  } catch (err) {
    throw err; // re-throw error (handled in controller)
  }
};

export const getSearchResultsPage = function () {
  const start = (state.search.page - 1) * state.search.resultsPerPage;
  const end = state.search.page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  if (newServings <= 0) return;

  //update each ingredient quantity
  state.recipe.ingredients.forEach(ingredient => {
    if (!ingredient.quantity) ingredient.quantity = 1;

    ingredient.quantity = (
      (ingredient.quantity / state.recipe.servings) *
      newServings
    ).toFixed(2);
  });
  // change original servings
  state.recipe.servings = newServings;
};

export const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  //get index of bookmark to remove
  const index = state.bookmarks.findIndex(el => el.id === id);
  // remove 1 element
  state.bookmarks.splice(index, 1);

  // mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient-') && entry[1] !== '')
      .map(ingredient => {
        const ingredientArr = ingredient[1].split(',');
        const [quantity, units, description] = ingredientArr;
        if (ingredientArr.length !== 3) {
          throw new Error(
            'Wrong ingredient format. Please use the correct format.'
          );
        }
        return {
          quantity: quantity ? Number(quantity) : null,
          units,
          description,
        };
      });

    const recipe = {
      id: newRecipe.id,
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients: ingredients,
    };

    // upload recipe
    let data = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });
    data = await data.json();

    const recipeReturned = data.data.recipe;
    state.recipe = {
      id: recipeReturned.id,
      title: recipeReturned.title,
      publisher: recipeReturned.publisher,
      sourceUrl: recipeReturned.source_url,
      image: recipeReturned.image_url,
      servings: recipeReturned.servings,
      cookingTime: recipeReturned.cooking_time,
      ingredients: recipeReturned.ingredients,
    };
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

// read bookmarks from localStorage
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
