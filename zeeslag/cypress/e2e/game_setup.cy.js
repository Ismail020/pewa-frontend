describe("Game Setup Tests", () => {
  it("allows ships to be dragged and dropped on the grid", () => {
    cy.visit("http://localhost:5173/game/setup", { timeout: 10000 });
    cy.contains("Place Your Ships", { timeout: 5000 }).should("be.visible");

    cy.get(".ships-container .ship", { timeout: 5000 }).should(
      "have.length",
      5
    );

    cy.get(".game-board", { timeout: 5000 }).should("exist");
    cy.get(".game-board .row", { timeout: 5000 }).should("have.length", 10);
    cy.get(".game-board .cell", { timeout: 5000 }).should("have.length", 100);

    cy.get(".ships-container .ship")
      .first()
      .as("shipToDrag")
      .trigger("dragstart", {
        dataTransfer: {
          setData: cy.stub().as("setData"),
          setDragImage: cy.stub().as("setDragImage"),
        },
      });

    cy.wait(1000);

    cy.get(".game-board .row")
      .eq(0)
      .find(".cell")
      .eq(0)
      .as("targetCell")
      .trigger("drop", {
        dataTransfer: {
          getData: cy.stub().returns("mocked data"),
        },
      });

    cy.wait(1000);

    cy.get("@targetCell", { timeout: 5000 }).should("have.class", "occupied");

    cy.get(".ships-container .ship", { timeout: 5000 }).should(
      "have.length",
      4
    );
  });
});

describe("Game Setup Tests", () => {
  it("randomizes ships and resets the grid", () => {
    cy.visit("http://localhost:5173/game/setup", { timeout: 10000 });
    cy.contains("Place Your Ships", { timeout: 5000 }).should("be.visible");

    cy.get(".ships-container .ship", { timeout: 5000 }).should(
      "have.length",
      5
    );

    cy.get("button").contains("Randomize", { timeout: 5000 }).click();

    cy.get(".ships-container .ship", { timeout: 5000 }).should(
      "have.length",
      0
    );

    cy.get("button").contains("Reset", { timeout: 5000 }).click();

    cy.get(".ships-container .ship", { timeout: 5000 }).should(
      "have.length",
      5
    );
  });
});
