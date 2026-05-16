/**
 * In-memory live-capture log. Demo-only — staff can dictate notes to Sandy
 * during a stay and we surface them as observed memories on the staff
 * tablet. In production this writes to the Postgres event journal that
 * feeds the next compose() pass.
 */

export type StaffNote = {
  id: string;
  capturedAt: string;
  transcript: string;
  guestId?: string;
  propertyId?: string;
};

const MAX_NOTES = 50;
const notes: StaffNote[] = [];

export function appendNote(note: Omit<StaffNote, "id" | "capturedAt">): StaffNote {
  const stored: StaffNote = {
    id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    capturedAt: new Date().toISOString(),
    ...note,
  };
  notes.unshift(stored);
  while (notes.length > MAX_NOTES) notes.pop();
  return stored;
}

export function listNotes(limit = 10): StaffNote[] {
  return notes.slice(0, limit);
}
