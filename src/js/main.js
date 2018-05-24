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

/**
 * Variables
 */
let myLibrary = [];
let book1 = new Book(
  'The Fellowship of the Ring',
  'J. R. R. Tolkien',
  '479',
  true
);
let book2 = new Book('The Two Towers', 'J. R. R. Tolkien', '415', true);
let book3 = new Book('The Return of the King', 'J. R. R. Tolkien', '347', true);
let book4 = new Book('The Silmarillion', 'J. R. R. Tolkien', '365', false);
let bookForm = document.querySelector('#add-book-form');

const tableBooks = document.getElementById('table-books');
// const addBookSection = document.getElementById('add-book');

myLibrary.push(book1, book2, book3, book4);

/**
 * Function to output myLibrary to view.
 */

renderLibrary();

function renderLibrary() {
  tableBooks.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i++) {
    let row = tableBooks.insertRow(-1);

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
      let newCell = row.insertCell(-1);
      newCell.classList.add('read-column');
      insertIcon(index, newCell, book[property]);
    } else if (book.hasOwnProperty(property) && typeof book[property] != 'function') {
      row.insertCell(-1).innerText = book[property];
    } else {
      insertIcon(index, row.insertCell(-1), 'delete');
    }
  }
};

/**
 * Functions related to icons
 */
function insertIcon(rowIndex, currentCell, type) {
  let iconType = type.toString();
  let newIcon = createIcon(rowIndex, iconType);
  
  currentCell.appendChild(newIcon);
  defineIconAction(newIcon, iconType);
};

function createIcon(index, type) {
  let iconElement = document.createElement('a');
  iconElement.setAttribute('data-book-index-delete', index);
  iconElement.classList.add('material-icons');

  defineIconType(iconElement, type);

  return iconElement;
}

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
