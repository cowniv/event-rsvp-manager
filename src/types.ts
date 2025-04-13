export type RsvpStatus = "going" | "maybe" | "declined";

export interface Guest {
  id: string;
  name: string;
  email: string;
}
