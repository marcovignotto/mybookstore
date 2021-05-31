/**
 * @desc add book into db
 */

describe("Add a book, check database if is added", () => {
  before(() => {
    cy.visit("http://localhost:3000/insert");
    // cy.wait();
  });

  it("Look for a book named Cujo", () => {
    cy.get("#title").clear().type("cujo");
    cy.get("#author").clear().type("stephen king");
    // cy.get("input[type=title]").clear().type("cujo");
  });

  it("Click search button", () => {
    cy.get(".btn-search").click({ force: true });
    cy.wait(3000);
  });

  it("Click on the first book named Cujo", () => {
    cy.get(".items-found").within(() => {
      cy.contains("Cujo").should("have.class", "item3");
      return cy.contains("Stephen King").should("have.class", "item4").click();
    });
  });

  it("Change book's price, qnt, quality", () => {
    // change input price
    cy.get(".input-price").clear().type("42");
    // change input stock
    cy.get(".input-stock").clear().type("42");
    // change input status
    cy.get(".input-status").select("crap");
  });

  it("Click on button to add book", () => {
    // click on btn
    cy.get(".makeStyles-btnAddDb-20").click();
    // check if class is changed
    cy.get(".item-added");
  });
});
