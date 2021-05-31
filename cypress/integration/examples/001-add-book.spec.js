describe("Add a book", () => {
  before(() => {
    cy.visit("http://localhost:3000/insert");
    // cy.wait();
  });

  it("Look for a book named Cujo", () => {
    cy.get("#title").clear().type("cujo");
    cy.get("#author").clear().type("stephen king");
    // cy.get("input[type=title]").clear().type("cujo");
  });
});
