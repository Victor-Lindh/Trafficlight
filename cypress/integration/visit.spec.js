describe('App page test', function() {
  it('Visits the app', function() {
    cy.visit('/');
  });
  it('Tries to find cars driving from start'), function(){
    cy.visit('/');
    cy.contains('div','Cars driving...');
  }
  it('Clicks the button, wait 20 seconds before clicking again', function(){
      cy.visit('/');
      cy.get('.container').find('button').click();
      cy.wait(20000);
      cy.get('.container').find('button').click();
  });
  it('Finds button to be disabled', function(){
    cy.visit('/');
    cy.get('.container').find('button').click();
    cy.get('button').should('be.disabled');
  })
});