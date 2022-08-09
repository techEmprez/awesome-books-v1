const form = document.querySelector('.add-book');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const bookList = document.querySelector('.book-list');
class Storage {
  constructor() {
    this.collection = [];
  }

  static addCollection(newBook) {
    this.collection.push(newBook);
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }

  static removeFromCollection(target) {
    const removeBook = target.previousElementSibling.firstElementChild.textContent;

    this.collection.filter((book, index) => {
      if (book.title === removeBook) {
        this.collection.splice(index, 1);
      }
      return this.collection;
    });
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }

  static getBooksFromStorage() {
    if (localStorage.getItem('collection') === null) {
      this.collection = [];
    } else {
      this.collection = JSON.parse(localStorage.getItem('collection'));
    }
    return this.collection;
  }
}

function Book(title, author) {
  this.title = title;
  this.author = author;
}
function UI() {}

UI.prototype.addBookToUI = function (newBook) {
  Storage.collection.forEach((book, index) => {
    if (book.title === newBook.title) {
      if (index % 2 === 0) {
        bookList.innerHTML += `
        <li class='book list-group-item-secondary d-flex flex-row justify-content-between py-3'>
          <div class='d-flex flex-row ms-5'>
            <p class='book-title margin-sm fs-5'>${newBook.title}</p>
            <p class='book-author margin-sm fs-5'>&nbsp by ${newBook.author}</p>
          </div>
          <button class='remove btn btn-danger me-5' type='button'>Remove</button>
        </li>
        `;
      } else {
        bookList.innerHTML += `
        <li class='book list-group-item-light d-flex flex-row justify-content-between py-3'>
          <div class='d-flex flex-row ms-5'>
            <p class='book-title margin-sm fs-5'>${newBook.title}</p>
            <p class='book-author margin-sm fs-5'>&nbsp by ${newBook.author}</p>
            </div>
          <button class='remove btn btn-danger me-5' type='button'>Remove</button>
        </li>
        `;
      }
    }
  });
};

UI.prototype.clearInputs = function (element1, element2) {
  element1.value = '';
  element2.value = '';
};

UI.prototype.removeBookFromUI = function (target) {
  target.parentElement.remove();
};

const ui = new UI();

function addBook(e) {
  const title = bookTitle.value;
  const author = bookAuthor.value;

  const newBook = new Book(title, author);

  Storage.addCollection(newBook);

  ui.addBookToUI(newBook);
  ui.clearInputs(bookTitle, bookAuthor);

  e.preventDefault();
}

function removeBook(e) {
  if (e.target.className === 'remove btn btn-danger me-5') {
    ui.removeBookFromUI(e.target);
    Storage.removeFromCollection(e.target);
    /* eslint-disable */

    location.reload();
  }
}

form.addEventListener('submit', addBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', () => {
  const allBooks = Storage.getBooksFromStorage();
  allBooks.forEach((book) => ui.addBookToUI(book));
});
