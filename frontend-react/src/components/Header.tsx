export function Header() {
  return (
    <header className="ciw-header">
      <div className="ciw-header__brand">
        <span className="ciw-header__logo" aria-hidden>☁</span>
        <div>
          <div className="ciw-header__eyebrow">JDCP · PCID</div>
          <div className="ciw-header__title">Joint Defence Cloud Program</div>
        </div>
      </div>
      <div className="ciw-header__actions">
        <button className="ciw-chip">Pramod Dahale</button>
        <button className="ciw-chip">Sign out</button>
        <button className="ciw-chip ciw-chip--lang" aria-label="Toggle language">
          <strong>EN</strong> ⇄ Français
        </button>
      </div>
    </header>
  );
}
