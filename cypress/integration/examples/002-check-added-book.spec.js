/**
 * @desc check is is added into db
 */

describe("Check if thew book is added", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Click on Database on menu", () => {
    cy.get(".btn-database").click();
  });

  it("Click on search without fields", () => {
    cy.get(".btn-search-db").click();
    cy.wait(3000);
  });

  it("Click on the first book named Cujo", () => {
    cy.get(".items-found").within(() => {
      cy.contains("Cujo").should("have.class", "item3");
      cy.contains("Stephen King").should("have.class", "item4").click();
    });
  });

  it("Check if correct amounts are inserted", () => {
    cy.get(".input-price").should("have.value", "42");
    cy.get(".input-stock").should("have.value", "42");
    cy.get(".input-status").should("have.value", "Crap");
  });
});
