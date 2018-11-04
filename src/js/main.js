/**
 * Materialize modal functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  let bookForm = document.querySelector('#add-book-form');
  let elems = document.querySelectorAll('.modal');
  let options = {
    dismissible: false,
    onCloseEnd: function() {
      bookForm.reset();
    },
  };

  M.Modal.init(elems[0], options);
});

/**
 * Represents a book
 */
class Book {
  /**
   * @param {string} title
   * @param {string} author
   * @param {number} pages
   * @param {boolean} read
   */
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  /**
   * Toggles if a book has been read
   */
  toggleRead() {
    this.read = !this.read;
  };
};

/**
 * Variables
 */
let myLibrary = [];
let book1 = new Book('The Fellowship of the Ring', 'J. R. R. Tolkien', '479', true);
let book2 = new Book('The Two Towers', 'J. R. R. Tolkien', '415', true);
let book3 = new Book('The Return of the King', 'J. R. R. Tolkien', '347', true);
let book4 = new Book('The Silmarillion', 'J. R. R. Tolkien', '365', false);
let bookForm = document.querySelector('#add-book-form');

const tableBodyOfBooks = document.getElementById('table-books');

myLibrary.push(book1, book2, book3, book4);

/**
 * Function to output myLibrary to view.
 */
function renderLibrary() {
  tableBodyOfBooks.innerHTML = '';
  
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let row = tableBodyOfBooks.insertRow(-1);
    
    fillRow(i, book, row);
  }
};

renderLibrary();

/**
 * Function to create a row
 * @param {number} index - the book's index in myLibrary
 * @param {object} book - the book
 * @param {HTML} row - the table row HTML element
 */
function fillRow(index, book, row) {
  Object.keys(book).forEach((prop) => {
    let cell = row.insertCell(-1);

    if (prop == 'read') {
      cell.classList.add('read-column');
      insertIcon(index, cell, book[prop]);
    } else {
      cell.innerText = book[prop];
    }
  });

  Object.getOwnPropertyNames(Book.prototype).forEach((prop) => {
    let cell = row.insertCell(-1);

    if (prop != 'constructor') {
      insertIcon(index, cell, 'delete');
    }
  });
};

/**
 * Function to insert a created icon
 * @param {number} index - the book's index in myLibrary
 * @param {object} cell - the table's cell
 * @param {string} type - the type of icon to insert
 */
function insertIcon(index, cell, type) {
  let iconType = type.toString();
  let newIcon = createIcon(index, iconType);
  
  cell.appendChild(newIcon);
};

/**
 * Function to create an icon
 * @param {number} index - the current
 * @param {string} type - the icon type
 * @return {HTML} - HMTL link element
 */
function createIcon(index, type) {
  let icon = document.createElement('a');
  icon.setAttribute('data-book-index', index);

  setStyle(icon, type);

  return icon;
};

/**
 * @param {HTML} icon - The HTML element being styled
 * @param {string} type - The type of icon being created
 */
function setStyle(icon, type) {
  switch (type) {
    case 'delete':
      icon.classList.add('material-icons', 'delete');
      icon.innerHTML = 'delete';
      icon.addEventListener('click', function() {
        deleteBook(icon);
      });
      break;
    case 'true':
      icon.classList.add('material-icons', 'check');
      icon.innerHTML = 'check';
      icon.addEventListener('click', function() {
        toggleRead(icon);
      });
      break;
    case 'false':
      icon.classList.add('material-icons', 'clear');
      icon.innerHTML = 'clear';
      icon.addEventListener('click', function() {
        toggleRead(icon);
      });
      break;
  };
}

/**
 * @param {HTML} icon - Link element of the icon
 */
function toggleRead(icon) {
  let index = icon.dataset.bookIndex;
  let targetRow = icon.parentElement.parentElement;
  let book = myLibrary[index];
  
  targetRow.innerHTML = '';
  book.toggleRead();

  fillRow(index, book, targetRow);
};

/**
 * @param {HTML} icon
 */
function deleteBook(icon) {
  let index = icon.dataset.bookIndex;
  let book = myLibrary[index];

  if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

/**
 * Functions to toggle the addBook form
 */
let cancelBookButton = document.querySelector('#add-book-form__cancel');

cancelBookButton.onclick = function() {
  bookForm.reset();
};

/**
 * Obtain book parameters from form
 */
let modal = document.querySelector('.modal');
let createBookButton = document.querySelector('#add-book-form__submit');

createBookButton.onclick = function() {
  let newBookTitle = this.form[0].value;
  
  if (!newBookTitle || newBookTitle.trim().length === 0) {
    alert('You must enter a Title');
  } else {
    addBookToLibrary();
    let modalInstance = M.Modal.init(modal);
    modalInstance.close();
    bookForm.reset();
    renderLibrary();
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
