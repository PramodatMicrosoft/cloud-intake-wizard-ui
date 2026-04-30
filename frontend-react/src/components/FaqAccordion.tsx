import { useEffect, useState } from "react";

interface FaqEntry { id: string; question: string; answer: string; }

export function FaqAccordion() {
  const [items, setItems] = useState<FaqEntry[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/faq?lang=en")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => {
        setItems(data);
        if (data.length > 0) setOpenId(data[0].id);
      })
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="ciw-card" id="faq">
      <header className="ciw-card__header">Frequently asked questions</header>
      <ul className="ciw-faq">
        {items.map((it) => {
          const open = openId === it.id;
          return (
            <li key={it.id} className={`ciw-faq__item ${open ? "ciw-faq__item--open" : ""}`}>
              <button
                className="ciw-faq__question"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : it.id)}
              >
                <span>{it.question}</span>
                <span className="ciw-faq__toggle">{open ? "−" : "+"}</span>
              </button>
              {open && <div className="ciw-faq__answer">{it.answer}</div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
