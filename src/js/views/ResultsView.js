import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.aside-recipes');

  _generateMarkup() {
    // generate markup to the parent element in the DOM
    console.log(this._data);
    return this._data
      .map(recipe => {
        return `
        <a href="#${recipe.id}">
          <div class="aside-recipe">
            <img
              src="${recipe.image}"
              class="aside-recipe-img"
            />
            <h4 class="aside-recipe-title">${recipe.title}</h4>
            <h6 class="aside-recipe-publisher">${recipe.publisher}</h6>
          </div>
        </a>
        `;
      })
      .join('');
  }
}

export default new ResultsView();
