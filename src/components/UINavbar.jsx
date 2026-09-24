function UINavbar() {
  return (
    <nav className="navbar navbar-expand-lg app-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="/">
          <span className="brand-mark">
            <i className="bi bi-heart-pulse-fill" />
          </span>
          <span>FakeNatty</span>
        </a>
      </div>
    </nav>
  );
}

export default UINavbar;
