let fixtures = {};

describe("Test Login/Logout users path", () => {
  before(() => {
    cy.fixture("registeredUser.json").then((user) => {
      fixtures.registeredUser = user;
    });
  });

  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/");
  });

  describe("Test login", () => {
    beforeEach(() => {
      cy.get('[data-cy="login"]').click();
    });
    it("should go to /login", () => {
      cy.url().should("contains", "/login");
    });
    it("should render the signIn component", () => {
      cy.get("[data-cy=login-form]").should("be.visible");
    });
    describe("Submit login form", () => {
      afterEach(() => {
        cy.get("[data-cy=logout]").click();
      });
      it("should successfully login", () => {
        const { username, password } = fixtures.registeredUser;
        cy.get("[data-cy=username]").type(username);
        cy.get("[data-cy=password]").type(password);
        cy.get("[data-cy=login-button]").click();
        cy.get("[data-cy=logout]").should("be.visible");
      });
    });
  });
  describe("Test logout", () => {
    beforeEach(() => {
      // const { username, password } = fixtures.registeredUser;
      // cy.get("[data-cy=username]").type(username);
      // cy.get("[data-cy=password]").type(password);
      // cy.get("[data-cy=login-button]").click();
    });
    it("should successfully logout", () => {
      cy.get('[data-cy="logout"]').click();
    });
  });
});
