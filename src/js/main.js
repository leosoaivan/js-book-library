/**
 * Classes
 */
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = function() {
    this.read = !this.read;
  };
};

function Button(type, btnText, btnClass) {
  this.type = type;
  this.btnText = btnText;
  this.btnClass = btnClass;
};

/**
 * Variables
 */
let myLibrary = [];
let allButtons = [];

let book1 = new Book(
  'The Fellowship of the Ring',
  'J. R. R. Tolkien',
  '479',
  true
);
let book2 = new Book('The Two Towers', 'J. R. R. Tolkien', '415', true);
let book3 = new Book('The Return of the King', 'J. R. R. Tolkien', '347', true);
let book4 = new Book('The Silmarillion', 'J. R. R. Tolkien', '365', false);

let toggleButton = new Button('toggle', 'Already read it?', 'toggle-button');
let deleteButton = new Button('delete', 'Delete this book', 'delete-button');

const tableBooks = document.getElementById('table-books');
const addBookSection = document.getElementById('add-book');

myLibrary.push(book1, book2, book3, book4);
allButtons.push(toggleButton, deleteButton);

/**
 * Function to output myLibrary to view.
 */

renderLibrary();

function renderLibrary() {
  tableBooks.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i++) {
    let row = tableBooks.insertRow(0);
    row.setAttribute('data-book-index', i);

    fillRow(i, row);
  }
};

/**
 * Function to create cells and fill with data
 */
function fillRow(index, row) {
  let book = myLibrary[index];
  
  for (let property in book) {
    if (book.hasOwnProperty(property) && typeof book[property] != 'function') {
      row.insertCell(-1).innerText = book[property];
    } else {
      addButton(row.insertCell(-1), 'toggle');
      addButton(row.insertCell(-1), 'delete');
    }
  }
};

/**
 * Functions related to buttons
 */

function addButton(currentCell, type) {
  buttonTemplate = allButtons.find((button) => button.type === type );
  newButton = buildButton(buttonTemplate);
  currentCell.appendChild(newButton);
};

function buildButton(template) {
  let button = document.createElement('button');
  button.innerHTML = template.btnText;
  button.classList.add(template.btnClass);

  button.addEventListener('click', function() {
    switch (template.type) {
      case 'toggle':
        toggleRead(button);
        break;
      case 'delete':
        deleteBook(button);
        break;
    }
  });
  return button;
};

function toggleRead(button) {
  let targetRow = button.parentElement.parentElement;
  let indexOfBookToEdit = targetRow.dataset.bookIndex;
  let bookToEdit = myLibrary[indexOfBookToEdit];
  
  targetRow.innerHTML = '';
  bookToEdit.toggleRead();

  fillRow(indexOfBookToEdit, targetRow);
};

function deleteBook(button) {
  let targetRow = button.parentElement.parentElement;
  let rowParent = targetRow.parentElement;
  rowParent.removeChild(targetRow);
}

/**
 * Functions to toggle the addBook form
 */
let showFormButton = document.getElementById('show-book__button');
let cancelBookButton = document.querySelector('#add-book-form__cancel');

showFormButton.onclick = function() {
  showAddBookSection();
};

cancelBookButton.onclick = function() {
  resetForm();
  hideAddBookSection();
};

function showAddBookSection() {
  addBookSection.style.display = 'block';
};

function hideAddBookSection() {
  addBookSection.style.display = 'none';
}

/**
 * Obtain book parameters from form
 */
let createBookButton = document.querySelector('#add-book-form__submit');

createBookButton.onclick = function() {
  let newBookTitle = this.form[0].value;
  
  if (!newBookTitle || newBookTitle.trim().length === 0) {
    alert('You must enter a Title');
  } else {
    addBookToLibrary();
    hideAddBookSection();
    resetForm();
    render();
  }
};

function addBookToLibrary() {
  let newBookTitle = this.form[0].value;
  let newBookAuthor = this.form[1].value;
  let newBookPages = this.form[2].value;
  let newBookRead = this.form[3].checked;
  
  let newBook = new Book(
    newBookTitle,
    newBookAuthor,
    newBookPages,
    newBookRead
  );

  myLibrary.push(newBook);
};

function resetForm() {
  addBookForm = document.getElementById('add-book-form').reset();
};
