import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  note_id: string = '';
  note!: Note;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.note_id = params['id'];
    });
    this.notesService.getNote(this.note_id).subscribe((response) => {
      if (response.success && response.data) {
        this.note = response.data;
      }
    });
  }

  deleteNote() {
    const confirmDelete = confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) {
      return;
    }
    this.notesService.deleteNote(this.note_id).subscribe((response) => {
      alert(response.message);
      if (response.success) {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      }
    });
  }
}
