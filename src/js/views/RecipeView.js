import View from './View.js';
import icons from '../../img/icons.svg';

import fracty from 'fracty';

class RecipeView extends View {
  _parentElement = document.querySelector('.main');

  _generateMarkup() {
    // generate markup to the parent element in the DOM
    return `
  <div>
    <img
      src="${this._data.image}"
      class="recipe-img"
    />
  </div>
  <h1 class="center-text">${this._data.title}</h1>
  <div class="recipe-info">
    <div>
      <svg>
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span>${this._data.cookingTime}</span>
      <span>min</span>
    </div>
    <div>
      <svg>
        <use href="${icons}#icon-users"></use>
      </svg>
      <span>${this._data.servings}</span>
      <span>servings</span>
      <button class="btn-decrease-servings btn-servings" data-update-to="${
        Number(this._data.servings) - 1
      }">
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn-increase-servings btn-servings" data-update-to="${
        Number(this._data.servings) + 1
      }">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>

    <div>
      <svg class="user-created-svg">
        <use href="${icons}#icon-user"></use>
      </svg>
      <button class="btn-bookmark">
        <svg>
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
        
      </button>
    </div>
  </div>
  <h4 class="center-text">Ingredients</h4>

  ${this._data.ingredients
    .map(
      ingredient =>
        `<div class="recipe-ingredients">
    <li class="recipe-ingredient">
      <span class="ingredient-quantity">${
        ingredient.quantity ? fracty(ingredient.quantity).toString() : ''
      }</span>
      <span class="ingredient-unit">${ingredient.unit}</span>
      <span class="ingredient-description">${ingredient.description}</span>
    </li>

  </div>`
    )
    .join('')}
  
  <h4 class="center-text">Directions</h4>
  <p class="recipe-directions">
    This recipe was carefully designed and tested by
    <span class="recipe-publisher">${this._data.publisher}</span>. Please check
    out directions at their website.
  </p>
  <p class="publisher-link">
    <a href="${this._data.sourceUrl}" target="_blank">
      Directions
      <svg>
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </p>
    `;
  }

  handleHashChangeAndPageLoad(handler) {
    // add event listener
    ['hashchange', 'load'].forEach(action =>
      window.addEventListener(action, handler)
    );
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-servings');
      if (!btn) return;
      const newServings = btn.dataset.updateTo;
      handler(newServings);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-bookmark');
      if (!btn) return;
      // const use = btn.children[0].children[0];
      // let attr = use.getAttribute('href');
      // attr = attr.slice(attr.indexOf('#') + 1);
      // if (attr === 'icon-bookmark')
      //   use.setAttribute('href', `${icons}#icon-bookmark-fill`);
      handler();
    });
  }
}
export default new RecipeView();
