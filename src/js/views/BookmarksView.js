import View from './View.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmark-list');
  _bookmarksBtn = document.querySelector('.bookmarks-btn');
  _bookmarksDiv = document.querySelector('.bookmarks');

  _generateMarkup = function () {
    return this._data
      .map(
        recipe =>
          `
          <li>
            <a href="#${recipe.id}">
            <div class="bookmark-recipe">
              <img src="${recipe.image}" class="bookmark-recipe-img"/>
              <h4 class="aside-recipe-title">${recipe.title}</h4>
              <h6 class="aside-recipe-publisher">${recipe.publisher}</h6>
            </div>
          </a>
        </li>
          `
      )
      .join('');
  };

  toggleBookmarks() {
    this._bookmarksDiv.classList.toggle('hidden');
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  addHandlerBookmarksView(handler) {
    this._bookmarksBtn.addEventListener('click', handler);
  }
}

export default new BookmarksView();
