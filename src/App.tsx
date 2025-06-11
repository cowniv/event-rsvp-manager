import { useMemo, useState, type FormEvent } from "react";
import type { EventItem, Guest, RsvpStatus } from "./types";
import { useLocalStorage } from "./useLocalStorage";

const uid = () => Math.random().toString(36).slice(2, 10);

const SEED: EventItem[] = [
  {
    id: uid(),
    title: "UI/UX Workshop: Figma to Code",
    date: "2025-07-12",
    venue: "PUP Main, Room 402",
    capacity: 40,
    guests: [
      { id: uid(), name: "Marco Reyes", email: "marco@example.com", status: "going", checkedIn: false },
      { id: uid(), name: "Andrea Cruz", email: "andrea@example.com", status: "maybe", checkedIn: false },
    ],
  },
];

const STATUS_STYLES: Record<RsvpStatus, string> = {
  going: "bg-green-100 text-green-700",
  maybe: "bg-amber-100 text-amber-700",
  declined: "bg-rose-100 text-rose-700",
};

export default function App() {
  const [events, setEvents] = useLocalStorage<EventItem[]>("rsvp-events", SEED);
  const [selectedId, setSelectedId] = useState<string>(events[0]?.id ?? "");
  const selected = events.find((e) => e.id === selectedId);

  const updateEvent = (id: string, fn: (e: EventItem) => EventItem) =>
    setEvents((prev) => prev.map((e) => (e.id === id ? fn(e) : e)));

  const createEvent = (data: Omit<EventItem, "id" | "guests">) => {
    const event: EventItem = { ...data, id: uid(), guests: [] };
    setEvents((prev) => [...prev, event]);
    setSelectedId(event.id);
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setSelectedId(events.find((e) => e.id !== id)?.id ?? "");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-4 py-5">
          <h1 className="text-xl font-bold">Event RSVP Manager</h1>
          <p className="text-sm text-white/70">Plan org events, track RSVPs and check guests in.</p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[300px_1fr]">
        <aside className="space-y-4">
          <EventForm onCreate={createEvent} />
          <ul className="space-y-2">
            {events.map((e) => (
              <li key={e.id}>
                <button
                  onClick={() => setSelectedId(e.id)}
                  className={`w-full rounded-xl border p-3 text-left transition ${
                    e.id === selectedId ? "border-brand bg-brand-light" : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(e.date).toLocaleDateString("en-PH", { dateStyle: "medium" })} · {e.venue}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {selected ? (
          <EventDetail
            event={selected}
            onChange={(fn) => updateEvent(selected.id, fn)}
            onDelete={() => deleteEvent(selected.id)}
          />
        ) : (
          <p className="text-slate-500">Create your first event to get started.</p>
        )}
      </main>
    </div>
  );
}

function EventForm({ onCreate }: { onCreate: (d: Omit<EventItem, "id" | "guests">) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", venue: "", capacity: 30 });

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="w-full rounded-xl bg-brand py-2.5 font-semibold text-white hover:opacity-90">
        + New event
      </button>
    );
  }

  return (
    <form
      className="space-y-2 rounded-xl border border-slate-200 bg-white p-4"
      onSubmit={(e) => {
        e.preventDefault();
        onCreate(form);
        setForm({ title: "", date: "", venue: "", capacity: 30 });
        setOpen(false);
      }}
    >
      <input required placeholder="Event title" className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input required type="date" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
      <input required placeholder="Venue" className="input" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
      <input required type="number" min={1} className="input" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
      <div className="flex gap-2">
        <button className="flex-1 rounded-lg bg-brand py-2 text-sm font-semibold text-white">Create</button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-lg px-3 text-sm text-slate-500">Cancel</button>
      </div>
    </form>
  );
}

function EventDetail({
  event,
  onChange,
  onDelete,
}: {
  event: EventItem;
  onChange: (fn: (e: EventItem) => EventItem) => void;
  onDelete: () => void;
}) {
  const [filter, setFilter] = useState<RsvpStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const stats = useMemo(() => {
    const count = (s: RsvpStatus) => event.guests.filter((g) => g.status === s).length;
    return {
      going: count("going"),
      maybe: count("maybe"),
      declined: count("declined"),
      checkedIn: event.guests.filter((g) => g.checkedIn).length,
    };
  }, [event.guests]);
}
