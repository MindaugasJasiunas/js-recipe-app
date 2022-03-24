class View {
  _data;

  /**
   * Render received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   */
  render(data, render = true) {
    this._data = data;
    const markup = _generateMarkup();
    this._clear();
    _parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Update changed DOM elements without reloading whole page
   * @param {Object | Object[]} data The data to be rendered
   * @returns {undefined}
   * @this {Object} View instance
   */
  update(data) {
    // Update DOM elements without reloading whole page
  }

  _clear() {
    // clear data from container to be rendered
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    // render spinner animation to the view until results arrive & is rendered
    const markup = ``;
    // attach to parent element
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errorMsg) {
    // render error message
    const markup = ``;
    // attach to parent element
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(msg) {
    // render message
    const markup = ``;
    // attach to parent element
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
