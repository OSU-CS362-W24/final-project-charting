beforeEach(() => {
    // Clear localStorage or reset state here if needed
    cy.clearLocalStorage(); // for example
  });

/**
 * Chart is correctly generated
 */
describe('Chart Generation', () => {
    it('successfully generates a chart image', () => {
      cy.visit('/line.html');
      cy.clearDataBtn();
  
      // Select inputs by id and type the values
      cy.get('#x-label-input').type('X Axis');
      cy.get('#y-label-input').type('Y Axis');
  
      // Click the button to add value inputs
      cy.get('#add-values-btn').click();
  
      // After adding inputs, you have to grab them. Assuming they are the only inputs of type 'number', you could do:
      cy.get('input[type="number"]').eq(0).type('1'); // first input for x-value
      cy.get('input[type="number"]').eq(1).type('10'); // first input for y-value

      cy.get('input[type="number"]').eq(2).type('2'); // second input for x-value
      cy.get('input[type="number"]').eq(3).type('5'); // second input for y-value
  
      // Trigger chart generation
      cy.get('#generate-chart-btn').click();
  
      // Verify an image appears. This assumes an <img> tag is added to the DOM with a chart.
      cy.get('img').should('be.visible').and((img) => {
        expect(img[0].naturalWidth).to.be.greaterThan(0); // this checks the image is rendered
      });

    });
});





/**
 * Chart data is maintained across pages
 */
it("Chart data maintains when switch among different chart type page", ()=>{
    cy.visit('/line.html');
    // clear the data first
    cy.clearDataBtn();
    // enter the data
    cy.enterChartData();
    cy.checkEnteredData();
    cy.get('input[type="number"]').should('have.length', 12);

    // switch page and check if the data remain
    cy.findByRole('link', {name: "Bar"}).click();
    cy.checkEnteredData();

})


/**
 * Saving a chart to the "gallery"
 */
it("Save a chart and verifies it is present in the gallery", function(){
    cy.visit('/line.html');
    cy.clearDataBtn();
    cy.enterChartData();

    const chartTitle = "Test Title";
    cy.get('#chart-title-input').type(chartTitle);

    cy.findByRole("button", {name : "Generate chart"}).click();

    // click the "save chart" button
    cy.get('#save-chart-btn').click();

    // go to gallery
    cy.findByRole("link", {name : "Gallery"}).click();
    cy.contains(chartTitle).should('exist');
})