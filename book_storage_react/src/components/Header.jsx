function Header({ favoriteCount, theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="page-container header-content">
        <div>
          <p className="eyebrow">THƯ VIỆN LỚP</p>
          <h1>Kho sách Ping Ming</h1>
        </div>
        <div className="header-actions">
          <p className="favorite-count">
            Yêu thích: <strong>{favoriteCount}</strong>
          </p>
          <button
            type="button"
            className="btn-theme"
            onClick={onToggleTheme}
            aria-label="Chuyển chế độ sáng tối"
          >
            {theme === 'dark' ? '☀️ Chế độ sáng' : '🌙 Chế độ tối'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
