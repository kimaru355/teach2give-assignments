describe('Update Note Component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('section div').first().click();
    cy.get('main section div button').first().click();
  });

  it('The fields are populated', () => {
    cy.get('#title').should('not.be.empty');
    cy.get('#content').should('not.be.empty');
  });
});
