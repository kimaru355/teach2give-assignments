import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoteComponent } from './pages/note/note.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':id', component: NoteComponent },
];
