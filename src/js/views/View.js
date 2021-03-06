import icons from './../../img/icons.svg';
export default class View {
  _data;

  /**
   * Render received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError('Results is empty');
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Update changed DOM elements without reloading whole page
   * @param {Object | Object[]} data The data to be rendered
   * @returns {undefined}
   * @this {Object} View instance
   */
  update(data) {
    // Update DOM elements without reloading whole page

    if (!data) return;
    this._data = data;

    //get all markup for comparison with new markup
    const newMarkup = this._generateMarkup();

    //convert string to DOM object - for comparison
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    //convert to arrays of elements
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // compare & change TEXT on elements
    newElements.forEach((newElement, index) => {
      const curElement = curElements[index];
      // change elements that are not the same
      if (
        !newElement.isEqualNode(curElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        // Node.nodeValue - returns text if text, or NULL if Document, ELement...
        curElement.textContent = newElement.textContent;
      }

      // change ATTRIBUTES on elements
      if (!newElement.isEqualNode(curElement)) {
        //change object to array, loop & change attributes of original element
        Array.from(newElement.attributes).forEach(attr => {
          curElement.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    // clear data from container to be rendered
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    // render spinner animation to the view until results arrive & is rendered
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    // attach to parent element
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(
    errorMsg = 'We could not find what you are looking for. Please try again!'
  ) {
    // render error message
    const markup = `
        <div class="error center-text">
        <p>  
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
          ${errorMsg}
        </p>
        </div>
      `;
    // attach to parent element
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(msg) {
    // render message
    const markup = `
        <div class="msg center-text">
        <p>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
          ${msg}
        </p>
        </div>
      `;
    // attach to parent element
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
