import { addBook, deleteBook, getBooks } from './api.js';
import { getFavorites, getTheme, setTheme, toggleFavorite } from './storage.js';
import {
  populateGenres,
  renderBooks,
  showError,
  showLoading,
  updateFavoriteCount,
  updateStatus,
} from './ui.js';

let allBooks = [];

function applyTheme(theme) {
  const themeToggle = document.querySelector('#theme-toggle');
  const isDark = theme === 'dark';

  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.textContent = isDark ? '☀️ Chế độ sáng' : '🌙 Chế độ tối';
}

function setFieldError(inputElement, errorElement, errorMessage) {
  errorElement.textContent = errorMessage;
  inputElement.setAttribute('aria-invalid', errorMessage ? 'true' : 'false');
  return !errorMessage;
}

function validateName() {
  const input = document.querySelector('#book-name');
  const error = document.querySelector('#name-error');
  const message = input.value.trim().length < 3
    ? 'Tên sách phải có ít nhất 3 ký tự.'
    : '';

  return setFieldError(input, error, message);
}

function validateAuthor() {
  const input = document.querySelector('#book-author');
  const error = document.querySelector('#author-error');
  const message = input.value.trim() ? '' : 'Tác giả không được để trống.';

  return setFieldError(input, error, message);
}

function validateGenre() {
  const input = document.querySelector('#book-genre');
  const error = document.querySelector('#genre-error');
  const message = input.value ? '' : 'Vui lòng chọn thể loại.';

  return setFieldError(input, error, message);
}

function validateYear() {
  const input = document.querySelector('#book-year');
  const error = document.querySelector('#year-error');
  const year = Number(input.value);
  const currentYear = new Date().getFullYear();
  const isValid = Number.isInteger(year) && year >= 1900 && year <= currentYear;
  const message = isValid ? '' : 'Năm xuất bản phải từ 1900 đến năm hiện tại.';

  return setFieldError(input, error, message);
}

function validateForm() {
  return [validateName(), validateAuthor(), validateGenre(), validateYear()]
    .every(Boolean);
}

function applyFilter() {
  const searchInput = document.querySelector('#search-input');
  const genreFilter = document.querySelector('#genre-filter');
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreFilter.value;

  const filteredBooks = allBooks.filter((book) => {
    const matchesName = book.name.toLowerCase().includes(keyword);
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesName && matchesGenre;
  });

  renderBooks(filteredBooks, getFavorites());
  updateStatus(filteredBooks.length, allBooks.length);
}

document.addEventListener('DOMContentLoaded', async () => {
  const themeToggle = document.querySelector('#theme-toggle');
  const searchInput = document.querySelector('#search-input');
  const genreFilter = document.querySelector('#genre-filter');
  const bookGrid = document.querySelector('#book-grid');
  const form = document.querySelector('#add-book-form');
  const submitButton = form.querySelector('.btn-submit');
  const nameInput = document.querySelector('#book-name');
  const authorInput = document.querySelector('#book-author');
  const genreInput = document.querySelector('#book-genre');
  const yearInput = document.querySelector('#book-year');

  applyTheme(getTheme());
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(nextTheme);
    setTheme(nextTheme);
  });

  searchInput.addEventListener('input', applyFilter);
  genreFilter.addEventListener('change', applyFilter);
  nameInput.addEventListener('input', validateName);
  authorInput.addEventListener('input', validateAuthor);
  genreInput.addEventListener('change', validateGenre);
  yearInput.addEventListener('input', validateYear);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Đang lưu...';

    const bookData = {
      name: nameInput.value.trim(),
      author: authorInput.value.trim(),
      genre: genreInput.value,
      year: Number(yearInput.value),
    };

    try {
      const newBook = await addBook(bookData);
      allBooks.unshift(newBook);
      populateGenres(allBooks);
      form.reset();
      applyFilter();
    } catch (err) {
      window.alert(err.message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Thêm sách';
    }
  });

  bookGrid.addEventListener('click', async (event) => {
    const favoriteButton = event.target.closest('.btn-fav');

    if (favoriteButton) {
      const favoriteIds = toggleFavorite(favoriteButton.dataset.id);
      updateFavoriteCount(favoriteIds.length);
      applyFilter();
      return;
    }

    const deleteButton = event.target.closest('.btn-delete');

    if (!deleteButton) {
      return;
    }

    const bookId = deleteButton.dataset.id;

    if (!confirm('Bạn có chắc chắn muốn xóa cuốn sách này?')) {
      return;
    }

    deleteButton.disabled = true;
    showLoading(true);

    try {
      await deleteBook(bookId);
      allBooks = allBooks.filter((book) => String(book.id) !== String(bookId));

      const favoriteIds = getFavorites();
      if (favoriteIds.includes(String(bookId))) {
        const updatedFavoriteIds = toggleFavorite(bookId);
        updateFavoriteCount(updatedFavoriteIds.length);
      }

      applyFilter();
    } catch (err) {
      showError(err.message);
    } finally {
      showLoading(false);
    }
  });

  showLoading(true);

  try {
    allBooks = await getBooks();
    const favoriteIds = getFavorites();

    updateFavoriteCount(favoriteIds.length);
    renderBooks(allBooks, favoriteIds);
    populateGenres(allBooks);
    updateStatus(allBooks.length, allBooks.length);
  } catch (err) {
    showError(err.message);
  } finally {
    showLoading(false);
  }
});
