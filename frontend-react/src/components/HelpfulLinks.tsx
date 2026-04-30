const LINKS = [
  { icon: "🏠", label: "JDCP home", href: "#" },
  { icon: "❓", label: "Frequently asked questions", href: "#faq" },
  { icon: "👥", label: "Know more about the JDCP team", href: "#" },
  { icon: "📄", label: "My requests", href: "#requests" }
];

export function HelpfulLinks() {
  return (
    <div className="ciw-card">
      <header className="ciw-card__header">Helpful links</header>
      <ul className="ciw-links">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="ciw-link">
              <span className="ciw-link__icon" aria-hidden>{l.icon}</span>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
