import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../interfaces/note';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  notes: Note[] = [];

  constructor(private notesService: NotesService) {
    this.notesService.getNotes().subscribe((response) => {
      if (response.success && response.data) {
        this.notes = response.data;
      }
    });
  }
}
