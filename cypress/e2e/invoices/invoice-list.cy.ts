describe("List of user invoices", () => {
  beforeEach(() => {
    cy.fixture("invoice-01").then((invoice1) => {
      cy.fixture("invoice-02").then((invoice2) => {
        cy.visit("/", {
          onBeforeLoad(win) {
            win.localStorage.setItem(
              "_invoice16806ad9-c64f-4ec4-ba99-39813ac1c373",
              JSON.stringify(invoice1),
            );
            win.localStorage.setItem(
              "_invoiceccb806f6-493e-4f8c-9cf3-fc9157653349",
              JSON.stringify(invoice2),
            );
          },
        });
      });
    });
  });

  it("Loads successfully", () => {
    cy.getDataAttr("invoice-preview-table").within(() => {
      cy.get("tr").should("have.length", 3); // Includes table header
    });
  });

  it("Can change invoice status", () => {
    cy.getDataAttr("invoice-preview-table")
      .find("tr")
      .eq(1)
      .within(() => {
        cy.getDataAttr("status-dropdown").click();
      });

    cy.get("body")
      .find('[data-cy="status-option-paid"]')
      .should("exist")
      .should("be.visible")
      .click();

    cy.reload();

    cy.getDataAttr("invoice-preview-table")
      .find("tr")
      .eq(1)
      .within(() => {
        cy.getDataAttr("status-dropdown").should("contain.text", "Paid");
      });
  });

  it("Can delete an invoice", () => {
    cy.getDataAttr("invoice-preview-table")
      .find("tr")
      .eq(1)
      .within(() => {
        cy.getDataAttr("action-dropdown").click();
      });

    cy.get("body")
      .find('.cy-action-delete') // have to use classes, cannot insert cy-data with this primeng component
      .should("exist")
      .should("be.visible")
      .click();

    cy.reload();

    cy.getDataAttr("invoice-preview-table").within(() => {
      cy.get("tr").should("have.length", 2); // Includes table header
    });
  });
});
