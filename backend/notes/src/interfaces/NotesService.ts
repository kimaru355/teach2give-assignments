import { Note } from "./Note";
import { Res } from "./Res";

export interface NotesService {
  getNotes(): Promise<Res>;
  getNote(id: string): Promise<Res>;
  createNote(note: Note): Promise<Res>;
  updateNote(id: string, note: Note): Promise<Res>;
  deleteNote(id: string): Promise<Res>;
}
