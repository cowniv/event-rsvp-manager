import { useMemo, useState, type FormEvent } from "react";
import type { EventItem, Guest, RsvpStatus } from "./types";
import { useLocalStorage } from "./useLocalStorage";

const uid = () => Math.random().toString(36).slice(2, 10);
