function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card">
      <div className="book-card-content">
        <span className="book-genre">{book.genre}</span>
        <h3>{book.name}</h3>
        <p><strong>Tác giả:</strong> {book.author}</p>
        <p><strong>Năm xuất bản:</strong> {book.year}</p>
      </div>
      <button
        type="button"
        className={`btn-fav ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(book.id)}
      >
        {isFavorite ? 'Đã thích' : 'Yêu thích'}
      </button>
    </article>
  )
}

export default BookCard
