beforeEach(() => {
  // Clear localStorage or reset state here if needed
  cy.clearLocalStorage(); // for example
});

/**
 * Chart is correctly generated
 */
describe("Chart Generation", () => {
  it("successfully generates a chart image", () => {
    cy.visit("/line.html");
    cy.clearDataBtn();

    // Select inputs by id and type the values
    cy.findByLabelText("X label").type("X Axis");
    cy.findByLabelText("Y label").type("Y Axis");

    // Click the button to add value inputs
    cy.findByRole("button", { name: "+" }).click();

    // After adding inputs, you have to grab them. Assuming they are the only inputs of type 'number', you could do:
    cy.findAllByLabelText("X").eq(0).type("1"); // first input for x-value
    cy.findAllByLabelText("Y").eq(0).type("10"); // first input for y-value

    cy.findAllByLabelText("X").eq(1).type("2"); // second input for x-value
    cy.findAllByLabelText("Y").eq(1).type("5"); // second input for y-value

    // Trigger chart generation
    cy.findByRole("button", { name: "Generate chart" }).click();

    // Verify an image appears. This assumes an <img> tag is added to the DOM with a chart.
    cy.get("img")
      .should("be.visible")
      .and((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0); // this checks the image is rendered
      });
  });
});

/**
 * Chart data is maintained across pages
 */
it("Chart data maintains when switch among different chart type page", () => {
  cy.visit("/line.html");
  // clear the data first
  cy.clearDataBtn();
  // enter the data
  cy.enterChartData();
  cy.checkEnteredData();
  cy.findAllByLabelText("X").should("have.length", 6);
  cy.findAllByLabelText("Y").should("have.length", 6);

  // switch page and check if the data remain
  cy.findByRole("link", { name: "Bar" }).click();
  cy.checkEnteredData();
});

/**
 * Saving a chart to the "gallery"
 */
it("Save a chart and verifies it is present in the gallery", function () {
  cy.visit("/line.html");
  cy.clearDataBtn();
  cy.enterChartData();

  const chartTitle = "Test Title";
  cy.findByLabelText("Chart title").type(chartTitle);

  cy.findByRole("button", { name: "Generate chart" }).click();

  // click the "save chart" button
  cy.findByRole("button", { name: "Save chart" }).click();

  // go to gallery
  cy.findByRole("link", { name: "Gallery" }).click();
  cy.contains(chartTitle).should("exist");
});

/**
 * Re-opening a saved chart
 */
it("Re-opens a saved chart", () => {
  // Create the chart with some data
  cy.visit("/line.html");
  cy.clearDataBtn();
  cy.enterChartData();
  const chartTitle = "Test Title";
  cy.findByLabelText("Chart title").type(chartTitle);
  cy.findByRole("button", { name: "Generate chart" }).click();

  // Save chart and find in gallery
  cy.findByRole("button", { name: "Save chart" }).click();
  cy.findByRole("link", {name: "Gallery"}).click();
  const chart = cy.contains(chartTitle);
  chart.should("exist");

  // Click on the chart to open it
  chart.click();

  // Verify the chart is opened
  cy.url().should("include", "/line.html");

  // Verify the chart data is present
  cy.findByLabelText("Chart title").should("have.value", chartTitle);
  cy.findAllByLabelText("X").should("have.length", 6);
  cy.findAllByLabelText("Y").should("have.length", 6);

  // Verify the chart is visible
  const chartImg = cy.findByRole("img");
  chartImg.should("be.visible");
  chartImg.should("have.attr", "src").should("not.be.empty");
})
