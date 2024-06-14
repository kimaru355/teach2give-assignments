import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  getNotes() {
    return this.http.get<{
      success: boolean;
      message: string;
      data: Note[] | null;
    }>('http://localhost:3003/notes/all');
  }

  getNote(id: string) {
    return this.http.get<{
      success: boolean;
      message: string;
      data: Note | null;
    }>(`http://localhost:3003/notes/${id}`);
  }

  createNote(note: Note) {
    return this.http.post<{ success: boolean; message: string; data: null }>(
      `http://localhost:3003/notes/create`,
      {
        title: note.title,
        content: note.content,
      }
    );
  }

  updateNote(note: Note) {
    return this.http.put<{ success: boolean; message: string; data: null }>(
      `http://localhost:3003/notes/${note.id}`,
      note
    );
  }

  deleteNote(id: string) {
    return this.http.delete<{ success: boolean; message: string; data: null }>(
      `http://localhost:3003/notes/${id}`
    );
  }
}
