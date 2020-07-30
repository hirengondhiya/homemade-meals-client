describe('Test login', () => {
	it('should go to /login', () => {
		cy.viewport(1024, 768);
		cy.visit('/');
		cy.get('[data-cy=login]').click();
		cy.url().should('contains', '/login');
	});
});
