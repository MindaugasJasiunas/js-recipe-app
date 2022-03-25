import View from './View.js';

class AddNewRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _modal = document.querySelector('.modal');
  // _overlay = document.querySelector('.overlay');
  _buttonOpenForm = document.querySelector('.new-recipe-btn');
  _buttonCloseForm = document.getElementsByClassName('close')[0];
  _buttonUpload = document.querySelector('.upload-btn');

  constructor() {
    super(); // must call super() before because its child class
    this._addHandlers();
  }

  _addHandlers() {
    const span = document.getElementsByClassName('close')[0];
    // const modal = document.querySelector('.modal');
    const newRecipeBtn = document.querySelector('.new-recipe-btn');

    window.onclick = function (event) {
      if (event.target == this._modal) {
        this._closeWindow();
      }
    }.bind(this);

    span.onclick = function () {
      this._closeWindow();
    }.bind(this);

    newRecipeBtn.onclick = function () {
      this._modal.style.display = 'block';
    }.bind(this);
  }

  _closeWindow() {
    this._modal.style.display = 'none';
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // modern browser API - to get data from form - new FormData( formElement );
      const dataArr = [...new FormData(this)]; // spread object into an array of arrays - ['name', 'John],['lastName', 'Doe'], ...
      //ES2019 - new handy method to convert entries to an object
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  _generateMarkup() {}
}
export default new AddNewRecipeView();
