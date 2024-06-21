import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoteComponent } from './pages/note/note.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';

export const routes: Routes = [
  { path: 'create', component: CreateNoteComponent },
  { path: 'update/:id', component: CreateNoteComponent },
  { path: '', component: HomeComponent },
  { path: ':id', component: NoteComponent },
];
