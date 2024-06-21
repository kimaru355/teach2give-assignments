import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css',
})
export class CreateNoteComponent {
  note_id: string = '';
  note: Note = {
    title: '',
    content: '',
  };
  old_note!: Note;
  isPending: boolean = true;

  constructor(
    private noteService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.note_id = params['id'];
        this.noteService.getNote(params['id']).subscribe((response) => {
          if (response.success && response.data) {
            this.note = response.data;
            this.old_note = JSON.parse(JSON.stringify(this.note));
          }
          this.isPending = false;
        });
      } else {
        this.isPending = false;
      }
    });
  }

  createNote(note: Note) {
    if (!note.title || !note.content) {
      alert('Please fill in all fields');
      return;
    }
    if (this.note_id) {
      if (
        this.old_note.title === this.note.title &&
        this.old_note.content === this.note.content
      ) {
        alert('No changes were made');
        return;
      }
      this.noteService.updateNote(this.note).subscribe((response) => {
        alert(response.message);
        if (response.success) {
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });
    } else {
      this.noteService.createNote(note).subscribe((response) => {
        alert(response.message);
        if (response.success) {
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
      });
    }
  }
}
