import { useState } from "react";

interface Message { role: "assistant" | "user"; text: string; }

const QUICK_STARTS = [
  "Start with a sandbox",
  "New dev environment",
  "Production workload",
  "Help me choose services"
];

const INITIAL: Message[] = [
  {
    role: "assistant",
    text:
      "Hello, I am the JDCP Intake Assistant. Tell me about the cloud workload you would like to onboard — for example: target environment (sandbox/dev/prod), data classification, or required services. You can switch between Text and Voice input at any time."
  },
  {
    role: "assistant",
    text: "To get started, describe the cloud workload you want to onboard. Include what it does and any sensitive data it will handle."
  }
];

export function ChatPanel() {
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const userMsg: Message = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);
    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages })
      });
      const data = await resp.json();
      setMessages((m) => [...m, { role: "assistant", text: data.reply ?? "(no reply)" }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: "Sorry, I could not reach the assistant. Please try again." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ciw-card ciw-chat">
      <header className="ciw-chat__header">
        <div>
          <div className="ciw-chat__title">Intake Assistant</div>
          <div className="ciw-chat__subtitle">
            Ask a question or describe your cloud request — I will help you complete the intake form.
          </div>
        </div>
        <div className="ciw-mode" role="tablist">
          <button
            className={`ciw-mode__btn ${mode === "text" ? "ciw-mode__btn--active" : ""}`}
            onClick={() => setMode("text")}
          >
            ⌨ Text
          </button>
          <button
            className={`ciw-mode__btn ${mode === "voice" ? "ciw-mode__btn--active" : ""}`}
            onClick={() => setMode("voice")}
          >
            🎤 Voice
          </button>
        </div>
      </header>

      <div className="ciw-chat__messages" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`ciw-msg ciw-msg--${m.role}`}>
            <div className="ciw-msg__avatar" aria-hidden>{m.role === "assistant" ? "JD" : "ME"}</div>
            <div className="ciw-msg__bubble">
              <div className="ciw-msg__role">{m.role === "assistant" ? "ASSISTANT" : "YOU"}</div>
              <div className="ciw-msg__text">{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="ciw-chat__quickstart">
        <span className="ciw-chat__quickstart-label">QUICK START</span>
        <div className="ciw-chat__quickstart-chips">
          {QUICK_STARTS.map((q) => (
            <button key={q} className="ciw-chip" onClick={() => send(q)} disabled={busy}>
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="ciw-chat__input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
          disabled={busy}
        />
        <button className="ciw-btn ciw-btn--primary" onClick={() => send(input)} disabled={busy}>
          Send
        </button>
      </div>

      <button className="ciw-chat__clear" onClick={() => setMessages(INITIAL)}>
        Clear conversation
      </button>
    </div>
  );
}
