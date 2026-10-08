function Section({ title, children, className = '' }) {
  return (
    <section className={`section-box ${className}`}>
      <div className="section-title-row">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default Section
