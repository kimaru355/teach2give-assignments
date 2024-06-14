import { Component } from '@angular/core';
import { CreateNoteComponent } from '../create-note/create-note.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CreateNoteComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isCreating: boolean = false;
}
