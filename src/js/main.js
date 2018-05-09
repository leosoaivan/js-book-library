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
let book3 = new Book('The Return of the Kind', 'J. R. R. Tolkien', '347', true);
let book4 = new Book('The Silmarillion', 'J. R. R. Tolkien', '365', false);

const tableBooks = document.getElementById('table-books');
const addBookSection = document.getElementById('add-book');


myLibrary.push(book1, book2, book3, book4);

render();

/**
 * A class constructor for books.
 */
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/**
 * A function to output myLibrary to view.
 */
function render() {
  tableBooks.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let row = tableBooks.insertRow(0);
    let cellTitle = row.insertCell(0);
    let cellAuthor = row.insertCell(1);
    let cellPages = row.insertCell(2);
    let cellRead = row.insertCell(3);

    cellTitle.innerHTML = book.title;
    cellAuthor.innerHTML = book.author;
    cellPages.innerHTML = book.pages;
    cellRead.innerHTML = book.read;
  }
}

/**
 * A function to toggle the addBook form
 */
let showFormButton = document.getElementById('show-book__button');

showFormButton.onclick = function() {
  showAddBookSection();
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
let createBookButton = document.getElementById('add-book-form__submit');

createBookButton.onclick = function() {
  let newBookTitle = this.form[0].value;
  
  if (!newBookTitle) {
    alert('You must enter a Title');
  } else if (newBookTitle.trim().length === 0) {
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
