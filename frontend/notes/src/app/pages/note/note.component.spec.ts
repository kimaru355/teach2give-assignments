import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { NoteComponent } from './note.component';
import { NotesService } from '../../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;
  let notesServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    notesServiceMock = {
      getNote: jasmine.createSpy('getNote').and.returnValue(
        of({
          success: true,
          data: { id: '1', title: 'Note 1', content: 'Content 1' },
        })
      ),
      deleteNote: jasmine.createSpy('deleteNote').and.returnValue(
        of({
          success: true,
          message: 'Note deleted',
        })
      ),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    activatedRouteMock = {
      params: of({ id: '1' }),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, NoteComponent],
      providers: [
        { provide: NotesService, useValue: notesServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        RouterLinkDirectiveStub,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch note on initialization', () => {
    expect(notesServiceMock.getNote).toHaveBeenCalledWith('1');
    expect(component.note).toEqual({
      id: '1',
      title: 'Note 1',
      content: 'Content 1',
    });
  });

  // it('should set routerLink attributes correctly', () => {
  //   const backButton = fixture.debugElement.query(By.css('button[routerLink]'));
  //   expect(backButton).toBeTruthy();
  //   expect(backButton.injector.get(RouterLinkDirectiveStub).linkParams).toBe(
  //     ''
  //   );

  //   const editButton = fixture.debugElement.query(By.css('button.edit'));
  //   expect(editButton).toBeTruthy();
  //   expect(editButton.injector.get(RouterLinkDirectiveStub).linkParams).toBe(
  //     '/update/1'
  //   );
  // });

  it('should delete note and navigate to home on successful delete', fakeAsync(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteNote();
    tick(); // Simulate the asynchronous passage of time for the delete call
    flush(); // Flush any pending timers (i.e., setTimeout)
    expect(notesServiceMock.deleteNote).toHaveBeenCalledWith('1');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should not delete note if confirm is canceled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteNote();
    expect(notesServiceMock.deleteNote).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
