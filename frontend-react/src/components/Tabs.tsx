interface TabSpec { id: string; label: string; }

export function Tabs({
  tabs, active, onChange
}: { tabs: TabSpec[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="ciw-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          className={`ciw-tab ${active === t.id ? "ciw-tab--active" : ""}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
