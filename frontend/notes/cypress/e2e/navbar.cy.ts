describe('Navbar Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('contains two buttons', () => {
    cy.get('header nav button').should('have.length', 2);
  });

  it('First button navigates home', () => {
    cy.get('header nav button').first().click();
    cy.url().should('eq', 'http://localhost:4200/');
  });
  it('Second button navigates to create button page', () => {
    cy.get('header nav button').eq(1).click();
    cy.url().should('eq', 'http://localhost:4200/create');
  });
});
