import { HowToFill } from "../components/HowToFill";
import { HelpfulLinks } from "../components/HelpfulLinks";
import { FaqAccordion } from "../components/FaqAccordion";
import { ChatPanel } from "../components/ChatPanel";

export function ChatView() {
  return (
    <div className="ciw-grid">
      <aside className="ciw-grid__left">
        <HowToFill />
        <HelpfulLinks />
        <FaqAccordion />
      </aside>
      <section className="ciw-grid__right">
        <ChatPanel />
      </section>
    </div>
  );
}
