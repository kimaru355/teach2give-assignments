import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CreateNoteComponent } from './create-note.component';
import { NotesService } from '../../services/notes.service';

describe('CreateNoteComponent', () => {
  let component: CreateNoteComponent;
  let fixture: ComponentFixture<CreateNoteComponent>;
  let mockNotesService: jasmine.SpyObj<NotesService>;
  let mockRouter: Router;

  beforeEach(async () => {
    mockNotesService = jasmine.createSpyObj('NotesService', [
      'getNote',
      'createNote',
      'updateNote',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: NotesService, useValue: mockNotesService },
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with pending state', () => {
    expect(component.isPending).toBeTrue();
  });

  // it('should load existing note when id is provided', () => {
  //   const sampleNote = {
  //     id: '1',
  //     title: 'Test Note',
  //     content: 'Sample content',
  //   };
  //   mockNotesService.getNote.and.returnValue(
  //     of({
  //       success: true,
  //       message: 'Note loaded successfully',
  //       data: sampleNote,
  //     })
  //   );

  //   fixture.detectChanges();

  //   expect(component.note).toEqual(sampleNote);
  //   expect(component.old_note).toEqual(sampleNote);
  //   expect(component.isPending).toBeFalse();
  // });

  // it('should not load note when id is not provided', () => {
  //   TestBed.overrideProvider(ActivatedRoute, { useValue: { params: of({}) } });

  //   fixture = TestBed.createComponent(CreateNoteComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();

  //   expect(mockNotesService.getNote).not.toHaveBeenCalled();
  //   expect(component.isPending).toBeFalse();
  // });

  // it('should create a new note', () => {
  //   const sampleNote = { title: 'New Note', content: 'New content' };
  //   mockNotesService.createNote.and.returnValue(
  //     of({ success: true, message: 'Note created successfully', data: null })
  //   );

  //   component.createNote(sampleNote);

  //   expect(mockNotesService.createNote).toHaveBeenCalledWith(sampleNote);
  //   expect(mockRouter.navigate).toHaveBeenCalled();
  // });

  // it('should update an existing note', () => {
  //   const sampleNote = {
  //     id: '1',
  //     title: 'Updated Note',
  //     content: 'Updated content',
  //   };
  //   component.old_note = { id: '1', title: 'Old Note', content: 'Old content' };
  //   component.note = sampleNote;

  //   mockNotesService.updateNote.and.returnValue(
  //     of({ success: true, message: 'Note updated successfully', data: null })
  //   );

  //   component.createNote(sampleNote);

  //   expect(mockNotesService.updateNote).toHaveBeenCalledWith(sampleNote);
  //   expect(mockRouter.navigate).toHaveBeenCalled();
  // });

  it('should display alert when title or content is empty', () => {
    spyOn(window, 'alert');

    component.createNote({
      title: '',
      content: 'Sample content',
    });

    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should display alert when no changes are made during update', () => {
    spyOn(window, 'alert');

    component.old_note = {
      id: '1',
      title: 'Sample Note',
      content: 'Sample content',
    };
    component.note = {
      id: '1',
      title: 'Sample Note',
      content: 'Sample content',
    };

    component.createNote(component.note);

    expect(window.alert).toHaveBeenCalledWith('No changes were made');
  });
});
