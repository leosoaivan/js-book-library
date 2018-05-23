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

// function Button(type, btnText, btnClass) {
//   this.type = type;
//   this.btnText = btnText;
//   this.btnClass = btnClass;
// };

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
    let row = tableBooks.insertRow(-1);
    row.setAttribute('data-book-index', i);

    fillRow(i, row);
  }
};

/**
 * Function to create cells and fill with data and icons
 */
function fillRow(index, row) {
  let book = myLibrary[index];
  
  for (let property in book) {
    if (book.hasOwnProperty(property) && property == 'read') {
      insertIcon(index, row.insertCell(-1), book[property]);
    } else if (book.hasOwnProperty(property) && typeof book[property] != 'function') {
      row.insertCell(-1).innerText = book[property];
    } else {
      insertIcon(index, row.insertCell(-1), 'delete');
    }
  }
};

/**
 * Functions related to buttons
 */

function insertIcon(rowIndex, currentCell, type) {
  let iconType = type.toString();
  let newIcon = createIcon(rowIndex, iconType);
  
  currentCell.appendChild(newIcon);
};

function createIcon(index, type) {
  let icon = document.createElement('a');
  icon.setAttribute('data-book-index-delete', index);
  icon.classList.add('material-icons');

  switch (type) {
    case 'delete':
      icon.classList.add('delete');
      icon.innerHTML = type;
      break;
    case 'true':
      icon.classList.add('check');
      icon.innerHTML = 'check';
      break;
    case 'false':
      icon.classList.add('clear');
      icon.innerHTML = 'clear';
      break;
  };

  icon.addEventListener('click', function() {
    switch (type) {
      case 'delete':
        deleteBook(icon);
        break;
      case 'true':
        toggleRead(icon);
        break;
      case 'false':
        toggleRead(icon);
        break;
    }
  });

  return icon;
}

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
  if (confirm('Are you sure you want to delete this book?')) {
    rowParent.removeChild(targetRow);
  }
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
