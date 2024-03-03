describe('TodoListComponent', () => {
    beforeEach(() => {
        cy.visit('/todo');
    });
  it('should add an item to items array', () => {
    const item = 'test';
    cy.getByTestId('todo-input').type(item);
    cy.getByTestId('add-item-button').click();
    cy.getByTestId('todo-item-0').should('contain', item);
  });

  it('should add an item to items array by pressing enter', () => {
    const item = 'test';
    cy.getByTestId('todo-input').type(item + '{enter}');
    cy.getByTestId('todo-item-0').should('contain', item);
  });

  it('should fail to add item because item already exists', () => {
    const item = 'test';
    cy.getByTestId('todo-input').type(item);
    cy.getByTestId('add-item-button').click();
    cy.getByTestId('todo-input').clear();
    cy.getByTestId('todo-input').type(item);
    cy.getByTestId('add-item-button').click();
    cy.get('p-toastitem').should('contain', 'Item already exists');
  });

  it('should fail to add item because input is empty', () => {
    cy.getByTestId('add-item-button').click();
    cy.get('p-toastitem').should('contain', 'Input cannot be empty');
  });

  it('should remove an item from items array', () => {
    const item = 'test';
    cy.getByTestId('todo-input').type(item);
    cy.getByTestId('add-item-button').click();
    cy.getByTestId('todo-item-0').should('contain', item);
    cy.getByTestId('remove-item-0').click();
    cy.getByTestId('todo-item-0').should('not.exist');
  });
});
