describe("Delete added book", () => {
  before(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Click on database on menu", () => {
    cy.get(".btn-database").click();
  });

  it("Click on SEARCH without fields", () => {
    cy.get(".btn-search-db").click();
    cy.wait(3000);
  });

  it("Click on the first book named Cujo", () => {
    cy.get(".items-found").within(() => {
      cy.contains("Cujo").should("have.class", "item3");
      cy.contains("Stephen King").should("have.class", "item4").click();
    });
  });

  it("Click on delete icon and confirm", () => {
    cy.get(".btn-icon-delete").click();
    cy.get(".btn-confirm-yes").click();
  });

  it("Checks if the book is still present", () => {
    cy.get(".items-found").within(() => {
      cy.contains("Cujo").should("not.contain", "item3");
    });
  });
});
