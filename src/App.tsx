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
}
