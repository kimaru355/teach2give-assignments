import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NotesService } from '../../services/notes.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let notesServiceMock: any;

  beforeEach(async () => {
    notesServiceMock = {
      getNotes: jasmine.createSpy('getNotes').and.returnValue(
        of({
          success: true,
          data: [
            { id: 1, title: 'Note 1', content: 'Content 1' },
            { id: 2, title: 'Note 2', content: 'Content 2' },
          ],
        })
      ),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, HomeComponent],
      providers: [
        { provide: NotesService, useValue: notesServiceMock },
        { provide: ActivatedRoute, useValue: {} },
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notes on initialization', () => {
    expect(notesServiceMock.getNotes).toHaveBeenCalled();
    expect(component.notes.length).toBe(2);
  });

  it('should render the notes', () => {
    const noteElements = fixture.debugElement.queryAll(By.css('section div'));
    expect(noteElements.length).toBe(2);
    expect(noteElements[0].nativeElement.textContent).toContain('Note 1');
    expect(noteElements[1].nativeElement.textContent).toContain('Note 2');
  });
});
