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
    
    fillRow(book, row);
  }
};

renderLibrary();

/**
 * Function to create a row
 * @param {object} book - the book
 * @param {number} row - the table row HTML element
 */
function fillRow(book, row) {
  Object.keys(book).forEach((prop) => {
    if (typeof prop == 'boolean') {
      let cell = row.insertCell(-1);
      cell.classList.add('read-column');
      cell.innerText = book[prop];
    } else {
      let cell = row.insertCell(-1);
      cell.innerText = book[prop];
    }
  });

  Object.getOwnPropertyNames(Book.prototype).forEach((prop) => {
    if (prop != 'constructor') {
      insertIcon(row, row.insertCell(-1), 'delete');
    }
  });
};

/**
 * Function to insert a created icon
 * @param {number} rowIndex - the table's current row
 * @param {object} currentCell - the table's current cell
 * @param {string} type - the type of icon to insert
 */
function insertIcon(rowIndex, currentCell, type) {
  let iconType = type.toString();
  let newIcon = createIcon(rowIndex, iconType);
  
  currentCell.appendChild(newIcon);
  defineIconAction(newIcon, iconType);
};

/**
 * Function to create an icon
 * @param {number} index - the table's current row
 * @param {string} type - the icon type
 * @return {HTML} - HMTL link element
 */
function createIcon(index, type) {
  let iconElement = document.createElement('a');
  iconElement.setAttribute(`data-book-index-${type}`, index);
  iconElement.classList.add('material-icons');

  defineIconType(iconElement, type);

  return iconElement;
};

function defineIconType(newIcon, type) {
  switch (type) {
    case 'delete':
      newIcon.classList.add('delete');
      newIcon.innerHTML = type;
      break;
    case 'true':
      newIcon.classList.add('check');
      newIcon.innerHTML = 'check';
      break;
    case 'false':
      newIcon.classList.add('clear');
      newIcon.innerHTML = 'clear';
      break;
  };
}

function defineIconAction(newIcon, type) {
  newIcon.addEventListener('click', function() {
    switch (type) {
      case 'delete':
        deleteBook(newIcon);
        break;
      case 'true':
        toggleRead(newIcon);
        break;
      case 'false':
        toggleRead(newIcon);
        break;
    }
  });
}

function toggleRead(icon) {
  let targetRow = icon.parentElement.parentElement;
  let targetBookTitle = targetRow.firstChild.innerText;

  let indexOfBookToEdit = findBookByAttr('title', targetBookTitle);
  let bookToEdit = myLibrary[indexOfBookToEdit];
  
  targetRow.innerHTML = '';
  bookToEdit.toggleRead();

  fillRow(indexOfBookToEdit, targetRow);
};

function deleteBook(icon) {
  let targetRow = icon.parentElement.parentElement;
  let targetBookTitle = targetRow.firstChild.innerText;

  let indexOfBookToEdit = findBookByAttr('title', targetBookTitle);

  if (confirm('Are you sure you want to delete this book?')) {
    myLibrary.splice(indexOfBookToEdit, 1);
    renderLibrary();
  }
}

function findBookByAttr(attr, value) {
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i][attr] === value) {
      return i;
    }
  }
  return -1;
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
