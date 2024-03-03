describe('EditListNameComponent', () => {
  const defaultListName = 'My Todo List';
  beforeEach(() => {
    cy.visit('/todo');
  });

  // e2e test for editing the list name
  it('should open dialog', () => {
    cy.getByTestId('list-edit-dialog-button').click();
    cy.getByTestId('list-edit-dialog').should('be.visible');
    cy.get('.p-dialog-title').should('contain', defaultListName);
  });

  it('should close dialog', () => {
    cy.getByTestId('list-edit-dialog-button').click();
    cy.getByTestId('list-edit-dialog').should('be.visible');
    cy.get('.p-dialog-header-close').click();
    cy.getByTestId('list-edit-dialog').should('not.be.visible');
  });

  it('should save the name', () => {
    const newName = 'test';
    cy.getByTestId('list-edit-dialog-button').click();
    cy.getByTestId('list-name-input').type(newName);
    cy.getByTestId('list-name-save-button').click();
    cy.getByTestId('list-name').should('contain', newName);
    cy.getByTestId('list-edit-dialog-button').click();
    cy.getByTestId('list-name-input').should('have.value', newName);
  });

  it('should save the name with enter', () => {
    const newName = 'test';
    cy.getByTestId('list-edit-dialog-button').click();
    cy.getByTestId('list-name-input').type(newName + '{enter}');
    cy.getByTestId('list-name').should('contain', newName);
  });

  it('should emit emptyName', () => {
    cy.getByTestId('list-edit-dialog-button').click();
    cy.getByTestId('list-name-save-button').click();
    cy.get('p-toastitem').should('contain', 'Input cannot be empty');
  });
});
