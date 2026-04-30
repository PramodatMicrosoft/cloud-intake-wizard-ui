import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Tabs } from "./components/Tabs";
import { ChatView } from "./views/ChatView";
import { MyRequestsView } from "./views/MyRequestsView";

export function App() {
  const [tab, setTab] = useState<"chat" | "requests">("chat");
  return (
    <div className="ciw-shell">
      <Header />
      <main className="ciw-main">
        <h1 className="ciw-title">Cloud Intake Wizard</h1>
        <Tabs
          tabs={[
            { id: "chat", label: "Chat" },
            { id: "requests", label: "My requests" }
          ]}
          active={tab}
          onChange={(id) => setTab(id as "chat" | "requests")}
        />
        {tab === "chat" ? <ChatView /> : <MyRequestsView />}
      </main>
      <Footer />
    </div>
  );
}
