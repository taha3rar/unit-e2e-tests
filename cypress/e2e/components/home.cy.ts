describe('HomeComponent', () => {
  beforeEach(() => {
    cy.visit('/home');
  });

  it('should display the correct header', () => {
    cy.getByTestId('title').should('have.text', 'Home');
  });

  it('should display the correct button', () => {
    cy.getByTestId('todo-routing-button').should('have.text', 'Todo List');
  });

  it('should navigate to the todo list', () => {
    cy.getByTestId('todo-routing-button').click();

    cy.url().should('include', '/todo');
  });
});
