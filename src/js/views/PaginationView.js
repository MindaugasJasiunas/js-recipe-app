import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    // generate markup to the parent element in the DOM
    const prevPageMarkup = `
        <button class="btn-prev btn"><< Prev Page</button>
      `;
    const nextPageMarkup = `
        <button class="btn-next btn">Next Page >></button>
      `;

    //get total pages
    const totalPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //generate markup
    let markup = ``;
    //if current page is only one - dont render pagination
    if (totalPages === 1) return markup;
    //if current page != 1 - render prev page
    if (this._data.page > 1) {
      markup += prevPageMarkup;
    }
    //if more pages than current - render next page
    if (totalPages > this._data.page) {
      markup += nextPageMarkup;
    }
    return markup;
  }

  addHandlerClick = function (handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.target.classList.contains('btn-next') && handler('next');
      e.target.classList.contains('btn-prev') && handler('prev');
    });
  };
}
export default new PaginationView();
