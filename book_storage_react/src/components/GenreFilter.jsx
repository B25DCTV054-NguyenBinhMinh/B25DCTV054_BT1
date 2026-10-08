function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-filter" aria-label="Lọc theo thể loại">
      <button
        type="button"
        className={selectedGenre === 'all' ? 'active' : ''}
        onClick={() => onSelectGenre('all')}
      >
        Tất cả
      </button>
      {genres.map((genre) => (
        <button
          type="button"
          className={selectedGenre === genre ? 'active' : ''}
          key={genre}
          onClick={() => onSelectGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter
