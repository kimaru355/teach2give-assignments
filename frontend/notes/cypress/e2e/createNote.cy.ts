describe('Create Note Component', () => {
  beforeEach(() => {
    cy.visit('/create');
  });

  it('Fails to submit form if nothing is provided', () => {
    cy.get('section form button').click();
  });
  it('Fails to submit form if content is not provided', () => {
    cy.get('#title').type('Title passed');
    cy.get('section form button').click();
  });
  it('Fails to submit form if title is not provided', () => {
    cy.get('#content').type('Content passed');
    cy.get('section form button').click();
  });
  it('Creates a note if all details are provided', () => {
    cy.get('#title').type('Testing Cypress');
    cy.get('#content').type('This is a valid note');
    cy.get('section form button').click();
    cy.location('pathname').should('eq', '/');
  });
});
