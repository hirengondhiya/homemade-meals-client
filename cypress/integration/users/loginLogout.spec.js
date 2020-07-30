describe('Test login', () => {
	it('should go to /login', () => {
		cy.visit('/');
		cy.get('[data-cy=login]').click();
		cy.url().should('contains', '/login');
	});
});
