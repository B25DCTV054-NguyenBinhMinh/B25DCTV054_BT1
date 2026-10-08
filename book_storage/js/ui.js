export function showLoading(isLoading) {
  const loadingState = document.querySelector('#loading-state');

  if (isLoading) {
    loadingState.removeAttribute('hidden');
  } else {
    loadingState.setAttribute('hidden', '');
  }
}

export function showError(message) {
  const bookGrid = document.querySelector('#book-grid');
  const errorMessage = document.createElement('p');

  errorMessage.className = 'state-message error-state';
  errorMessage.textContent = message;
  errorMessage.style.color = '#c0392b';
  bookGrid.replaceChildren(errorMessage);
}

export function renderBooks(books, favoriteIds = []) {
  const bookGrid = document.querySelector('#book-grid');
  bookGrid.replaceChildren();

  books.forEach((book) => {
    const card = document.createElement('article');
    card.className = 'book-card';

    const cardContent = document.createElement('div');
    cardContent.className = 'book-card-content';

    const genre = document.createElement('span');
    genre.className = 'book-genre';
    genre.textContent = book.genre;

    const title = document.createElement('h3');
    title.textContent = book.name;

    const author = document.createElement('p');
    author.textContent = `Tác giả: ${book.author}`;

    const year = document.createElement('p');
    year.textContent = `Năm xuất bản: ${book.year}`;

    cardContent.append(genre, title, author, year);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const favoriteButton = document.createElement('button');
    favoriteButton.type = 'button';
    favoriteButton.className = 'btn-fav';
    favoriteButton.dataset.id = book.id;

    if (favoriteIds.includes(String(book.id))) {
      favoriteButton.classList.add('active');
      favoriteButton.textContent = 'Đã thích';
    } else {
      favoriteButton.textContent = 'Yêu thích';
    }

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn-delete';
    deleteButton.textContent = 'Xóa';
    deleteButton.dataset.id = book.id;

    actions.append(favoriteButton, deleteButton);
    card.append(cardContent, actions);
    bookGrid.append(card);
  });
}

export function updateStatus(currentCount, totalCount) {
  const statusText = document.querySelector('#status-text');
  statusText.textContent = `Đang hiển thị ${currentCount} / ${totalCount} cuốn`;
}

export function updateFavoriteCount(count) {
  const favoriteCount = document.querySelector('#fav-count');
  favoriteCount.textContent = count;
}

export function populateGenres(books) {
  const genres = new Set(books.map((book) => book.genre));
  const genreFilter = document.querySelector('#genre-filter');
  const bookGenre = document.querySelector('#book-genre');

  while (genreFilter.options.length > 1) {
    genreFilter.remove(1);
  }

  while (bookGenre.options.length > 1) {
    bookGenre.remove(1);
  }

  genres.forEach((genre) => {
    const filterOption = document.createElement('option');
    filterOption.value = genre;
    filterOption.textContent = genre;
    genreFilter.append(filterOption);

    const formOption = document.createElement('option');
    formOption.value = genre;
    formOption.textContent = genre;
    bookGenre.append(formOption);
  });
}
