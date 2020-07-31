let fixtures = {};

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
  it("should go to /login", () => {
    cy.get("[data-cy=login]").click();
    cy.url().should("contains", "/login");
  });
  it("should render the signIn component", () => {
    cy.get("[data-cy=login]").click();
    cy.get("[data-cy=login-form]").should("be.visible");
  });
  it("should successfully login", () => {
    const { username, password } = fixtures.registeredUser;
    cy.get("[data-cy=login]").click();
    cy.get("[data-cy=username]").type(username);
    cy.get("[data-cy=password]").type(password);
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=logout]").should("be.visible");
  });
});
describe("Test logout", () => {
  it("should successfully logout", () => {
    const { username, password } = fixtures.registeredUser;
    cy.get("[data-cy=login]").click();
    cy.get("[data-cy=username]").type(username);
    cy.get("[data-cy=password]").type(password);
    cy.get("[data-cy=login-button]").click();
    cy.get("[data-cy=logout]").click();
  });
});
