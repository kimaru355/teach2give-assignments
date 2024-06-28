import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { RouterLinkDirectiveStub } from '../../testing/router-link-directive-stub'; // Import RouterLinkDirectiveStub for testing

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router; // Declare Router variable for spy

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), // Use RouterTestingModule with empty routes
      ],
      declarations: [RouterLinkDirectiveStub], // Include any necessary stubs or mocks
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject Router service
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render My Notes button with correct routerLink', () => {
    const myNotesButton = fixture.debugElement.query(
      By.css('button[routerLink=""]')
    );
    expect(myNotesButton).toBeTruthy();
  });

  it('should render Create Note button with correct routerLink', () => {
    const createNoteButton = fixture.debugElement.query(
      By.css('button[routerLink="create"]')
    );
    expect(createNoteButton).toBeTruthy();
  });

  // it('should navigate to correct routes on button click', () => {
  //   const navigateSpy = spyOn(router, 'navigateByUrl'); // Spy on navigateByUrl method of Router

  //   const myNotesButton = fixture.debugElement.query(
  //     By.css('button[routerLink=""]')
  //   );
  //   myNotesButton.nativeElement.click(); // Simulate click on My Notes button
  //   fixture.detectChanges();

  //   expect(navigateSpy).toHaveBeenCalledWith('/'); // Verify navigation to '/'

  //   const createNoteButton = fixture.debugElement.query(
  //     By.css('button[routerLink="create"]')
  //   );
  //   createNoteButton.nativeElement.click(); // Simulate click on Create Note button
  //   fixture.detectChanges();

  //   expect(navigateSpy).toHaveBeenCalledWith('/create'); // Verify navigation to '/create'
  // });
});
