import { useEffect, useState } from "react";

interface IntakeRequest {
  id: string;
  trackingId?: string;
  status: "draft" | "submitted" | "in-review" | "approved" | "rejected";
  fields: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
  submittedAt?: string;
}

export function MyRequestsView() {
  const [items, setItems] = useState<IntakeRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/requests")
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="ciw-card">Loading your requests…</div>;
  if (items.length === 0) {
    return <div className="ciw-card">You have no intake requests yet. Start a conversation in the Chat tab.</div>;
  }
  return (
    <div className="ciw-card">
      <table className="ciw-table">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id}>
              <td>{r.trackingId ?? "(draft)"}</td>
              <td>{(r.fields.projectTitle as string) ?? "Untitled"}</td>
              <td><span className={`ciw-pill ciw-pill--${r.status}`}>{r.status}</span></td>
              <td>{r.updatedAt ?? r.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
