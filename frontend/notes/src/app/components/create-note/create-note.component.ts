import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css',
})
export class CreateNoteComponent {
  constructor(private noteService: NotesService, private router: Router) {}

  createNote(note: Note) {
    if (!note.title || !note.content) {
      return;
    }
    this.noteService.createNote(note).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['']);
      }
    });
  }
}
