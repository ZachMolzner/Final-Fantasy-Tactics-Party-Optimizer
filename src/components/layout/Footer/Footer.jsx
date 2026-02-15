import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__dust" aria-hidden="true" />

      <div className="site-footer__inner">
        {/* Brand + Author */}
        <div className="site-footer__col">
          <div className="site-footer__brand">Ivalice Chronicles</div>

          <div className="site-footer__tag">
            FFT-Inspired Tactical Party Planner
          </div>

          <div className="site-footer__author">
            Created by{" "}
            <span className="site-footer__author-name">Zach Molzner</span>
          </div>
        </div>

        {/* Divider ornament */}
        <div className="site-footer__divider" aria-hidden="true">
          <span className="site-footer__dividerLine" />
          <span className="site-footer__dividerGem" />
          <span className="site-footer__dividerLine" />
        </div>

        {/* Meta */}
        <div className="site-footer__col site-footer__col--meta">
          <div className="site-footer__meta">
            <div>© {year}</div>
            <div className="site-footer__fine">
              Final Fantasy Tactics is © Square Enix. This is a fan-made
              project.
            </div>
          </div>

          <button
            type="button"
            className="site-footer__topButton"
            onClick={scrollTop}
            aria-label="Back to top"
            title="Back to top"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
