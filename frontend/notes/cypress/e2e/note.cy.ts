describe('Home Component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('section div').first().click();
  });
  it('visits the note page', () => {
    cy.url().should('contain', '-');
  });
  it('Displays the note', () => {
    cy.get('main section').should('be.visible');
  });
  it('User can navigate back', () => {
    cy.get('main > button').click();
    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('notes have two actions', () => {
    cy.get('section div button').should('have.length', 2);
  });

  it('Clicking on edit navigates to update page', () => {
    cy.get('main section div button').first().click();
    cy.url().should('contains', 'update');
  });

  it('Clicking on delete deletes the note and navigates the page', () => {
    cy.get('main section div button').eq(1).click();
    cy.url().should('eq', 'http://localhost:4200/');
  });

  it('display note title', () => {
    cy.get('section h2').should('not.be.empty');
  });
  it('display note content', () => {
    cy.get('section p').should('not.be.empty');
  });
});
