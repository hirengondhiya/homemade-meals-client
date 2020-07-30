beforeEach(() => {
	cy.viewport(1024, 768);
	cy.visit('/');
});

describe('Test login', () => {
	it('should go to /login', () => {
		cy.get('[data-cy=login]').click();
		cy.url().should('contains', '/login');
	});
	it('should render the signIn component', () => {
		cy.get('[data-cy=login]').click();
		cy.get('[data-cy=login-form]').should('be.visible');
	});
});
