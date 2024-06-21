import { Component } from '@angular/core';
import { ReverseStringPipe } from '../../pipes/reverse-string.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReverseStringPipe, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchText: string = '';
}
