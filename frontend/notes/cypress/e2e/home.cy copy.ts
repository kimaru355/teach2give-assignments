describe('Home Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visits the home page', () => {
    cy.get('section').should('be.visible');
  });

  it('notes are displayed', () => {
    cy.get('section div').should('have.length.above', 0);
  });

  it('display notes with titles', () => {
    cy.get('section div h3').each(($title) => {
      expect($title.text()).to.not.be.empty;
    });
  });

  it('should display notes with content', () => {
    cy.get('section div p').each(($content) => {
      expect($content.text()).to.not.be.empty;
    });
  });

  it('should navigate to note details when clicked', () => {
    cy.get('section div').first().click();
    cy.url().should('contain', '-');
  });
});
