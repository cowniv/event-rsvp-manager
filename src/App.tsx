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
    guests: [],
  },
];
