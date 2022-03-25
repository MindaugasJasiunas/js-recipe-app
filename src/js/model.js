import { RESULTS_PER_PAGE, API_URL } from './config.js';

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
    let data = await fetch(`${API_URL}/${id}`);
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
