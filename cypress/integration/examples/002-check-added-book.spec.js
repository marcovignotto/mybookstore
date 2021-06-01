/**
 * @desc check is is added into db
 */

describe("Check if thew book is added, and change values", () => {
  before(() => {
    cy.wait(2000);
    cy.visit("http://localhost:3000/database");
    cy.wait(2000);
  });
  // it("Click on Database on menu", () => {
  //   cy.get(".btn-database").click();
  //   cy.wait(2000);
  // });

  it("Click on Clear Search", () => {
    cy.get(".btn-clear-db-search").click();
    cy.wait(2000);
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
    cy.wait(200);
    cy.get(".input-stock").should("have.value", "42");
    cy.wait(200);
    cy.get(".input-status").should("have.value", "Crap");
    cy.wait(200);
  });

  it("Change amounts", () => {
    cy.get(".input-price").clear().type(55);
    cy.get(".input-stock").clear().type(55);
    cy.get(".input-status").select("Good");
  });

  it("Send update, and wait the confirmation", () => {
    cy.get(".btn-upd-item").click();
    cy.get(".book-delete").should("have.text", "Book Updated");
  });
});
