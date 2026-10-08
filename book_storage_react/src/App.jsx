import { useEffect, useState } from 'react'
import { initialBooks } from './data/books'
import BookList from './components/BookList'
import Footer from './components/Footer'
import GenreFilter from './components/GenreFilter'
import Header from './components/Header'
import Section from './components/Section'
import './App.css'

function App() {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const genres = [...new Set(initialBooks.map((book) => book.genre))]
  const filteredBooks = selectedGenre === 'all'
    ? initialBooks
    : initialBooks.filter((book) => book.genre === selectedGenre)

  function handleToggleFavorite(bookId) {
    setFavoriteIds((currentIds) => currentIds.includes(bookId)
      ? currentIds.filter((id) => id !== bookId)
      : [...currentIds, bookId])
  }

  function handleToggleTheme() {
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app-shell">
      <Header
        favoriteCount={favoriteIds.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="page-container main-content">
        <Section title="Lọc sách" className="filter-section">
          <GenreFilter
            genres={genres}
            selectedGenre={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
        </Section>

        <Section title="Danh sách sách" className="book-section">
          <p className="status-text">
            Đang hiển thị {filteredBooks.length} / {initialBooks.length} cuốn
          </p>
          <BookList
            books={filteredBooks}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default App
