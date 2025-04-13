export type RsvpStatus = "going" | "maybe" | "declined";

export interface Guest {
  id: string;
  name: string;
  email: string;
  status: RsvpStatus;
  checkedIn: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  date: string; // ISO date
}
