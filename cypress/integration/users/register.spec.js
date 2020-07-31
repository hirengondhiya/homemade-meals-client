import { v4 as uuid } from "uuid";
let fixtures = {};

describe("Test Register", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("/");
    cy.get('[data-cy="register"]').click();
  });
  it("should go to page /register", () => {
    cy.url().should("contains", "/register");
  });
  it("should render register component", () => {
    cy.get('[data-cy="register-form"]').should("be.visible");
  });
  it("should give error on not matching password", () => {
    const username = uuid();
    cy.get('[data-cy="register-form"]').within(() => {
      cy.get('[data-cy="username"]').type(username);
      cy.get('[data-cy="email"]').type(`${username}@email.com`);
      cy.get('[data-cy="radio-seller"]').click();
      cy.get('[data-cy="password"]').type(username);
      cy.get('[data-cy="confirm-password"]').type(username + "1");
      cy.get('[data-cy="submit-button"]').click();
      cy.get('[data-cy="validatio-error"]').should(
        "have.text",
        "Password does not match. Please try again."
      );
    });
  });
  it("should register seller", () => {
    const username = uuid();
    cy.get('[data-cy="register-form"]').within(() => {
      cy.get('[data-cy="username"]').type(username);
      cy.get('[data-cy="email"]').type(`${username}@email.com`);
      cy.get('[data-cy="radio-seller"]').click();
      cy.get('[data-cy="password"]').type(username);
      cy.get('[data-cy="confirm-password"]').type(username);
      cy.get('[data-cy="submit-button"]').click();
    });
    cy.get('[data-cy="alert-success"] [data-cy="alert-msg"]').should(
      "contain",
      username
    );
    cy.get('[data-cy="meals"]').should("have.text", "Meals history");
  });
  it("should register buyer", () => {
    const username = uuid();
    cy.get('[data-cy="register-form"]').within(() => {
      cy.get('[data-cy="username"]').type(username);
      cy.get('[data-cy="email"]').type(`${username}@email.com`);
      cy.get('[data-cy="radio-buyer"]').click();
      cy.get('[data-cy="password"]').type(username);
      cy.get('[data-cy="confirm-password"]').type(username);
      cy.get('[data-cy="submit-button"]').click();
    });
    cy.get('[data-cy="alert-success"] [data-cy="alert-msg"]').should(
      "contain",
      username
    );
    cy.get('[data-cy="orders"]').should("have.text", "My Orders");
  });
});
