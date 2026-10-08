const FAVORITES_KEY = 'favorite_books';
const THEME_KEY = 'theme';

export function getFavorites() {
  const savedFavorites = localStorage.getItem(FAVORITES_KEY);

  if (!savedFavorites) {
    return [];
  }

  try {
    const favorites = JSON.parse(savedFavorites);
    return Array.isArray(favorites) ? favorites.map((id) => String(id)) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(bookId) {
  const favorites = getFavorites();
  const normalizedId = String(bookId);
  const favoriteIndex = favorites.indexOf(normalizedId);

  if (favoriteIndex !== -1) {
    favorites.splice(favoriteIndex, 1);
  } else {
    favorites.push(normalizedId);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

export function getTheme() {
  return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
