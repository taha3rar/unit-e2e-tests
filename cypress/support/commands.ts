Cypress.Commands.add('getByTestId', (name) => {
  return cy.get(`[data-testid="${name}"]`);
});
