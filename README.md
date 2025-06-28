# 13 · Event RSVP Manager

**Roadmap stage:** Phase 6 – TypeScript + Tailwind · June 2025

An event tool for student orgs: create events, collect RSVPs, enforce capacity, check guests in at the door and export the list.

### Features
- Multiple events with capacity tracking and a progress bar
- Add guests; duplicate emails are blocked; full events waitlist guests as "maybe"
- Filter by status + search
- Door check-in (only for "going" guests)
- Export guest list to CSV
- Persists with a typed `useLocalStorage<T>` hook

### Run
```bash
npm install
npm run dev
```

### What I practiced
- TypeScript with React: interfaces, union types, generics, `Record`, `Omit`, `Partial`
- Tailwind CSS v4 with `@theme` tokens
- Writing a custom hook
