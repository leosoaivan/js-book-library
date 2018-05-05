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

const table = document.getElementById('table-books');

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
 * A function to add Book instances to myLibrary.
 */
// function addBookToLibrary() {
// }

/**
 * A function to output myLibrary to view.
 */
function render() {
  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];
    let row = table.insertRow(0);
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

myLibrary.push(book1, book2, book3, book4);

render();
