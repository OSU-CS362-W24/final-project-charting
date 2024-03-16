// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

require("@testing-library/cypress/add-commands")

Cypress.Commands.add("clearDataBtn", function(){
    cy.findByRole("button", { name: "Clear chart data" }).click();
    cy.wait(100);
})

Cypress.Commands.add("enterChartData",function(){
    cy.findByLabelText("X label").type("X Axis");
    cy.findByLabelText("Y label").type("Y Axis");

    // Click the button to add value inputs
    cy.findByRole("button", { name: "+" }).click();

    cy.findAllByLabelText("X").eq(0).type('1'); // 1st input for x-value
    cy.findAllByLabelText("Y").eq(0).type('3'); // 1st input for y-value
    cy.findByRole("button", { name: "+" }).click();

    cy.findAllByLabelText("X").eq(1).type('2'); // 2th input for x-value
    cy.findAllByLabelText("Y").eq(1).type('7'); // 2th input for y-value
    cy.findByRole("button", { name: "+" }).click();

    cy.findAllByLabelText("X").eq(2).type('3'); // 3rd input for x-value
    cy.findAllByLabelText("Y").eq(2).type('15'); // 3rd input for y-value
    cy.findByRole("button", { name: "+" }).click();

    cy.findAllByLabelText("X").eq(3).type('4'); // 4th input for x-value
    cy.findAllByLabelText("Y").eq(3).type('25'); // 4th input for y-value
    cy.findByRole("button", { name: "+" }).click();

    cy.findAllByLabelText("X").eq(4).type('5'); // 5th input for x-value
    cy.findAllByLabelText("Y").eq(4).type('40'); // 5th input for y-value

    // cy.get('#x-label-input').clear().type('X Axis');
    // cy.get('#y-label-input').clear().type('Y Axis');

    // // This assumes that new inputs are being added to the end of all existing inputs of type "number".
    // const dataPairs = [
    //     { x: '1', y: '3' },
    //     { x: '2', y: '7' },
    //     { x: '3', y: '15' },
    //     { x: '4', y: '25' },
    //     { x: '5', y: '40' },
    // ];

    // dataPairs.forEach((pair, index) => {
    //     if (index > 0) {
    //         cy.get('#add-values-btn').click();
    //     }
    //     // Here we're assuming that each button press adds two new inputs at the end
    //     cy.get('input[type="number"]').eq(index * 2).clear().type(pair.x);
    //     cy.get('input[type="number"]').eq(index * 2 + 1).clear().type(pair.y);
    // });
})

Cypress.Commands.add("checkEnteredData", function(){
    // // Check labels
    // cy.get('#x-label-input').should('have.value', 'X Axis');
    // cy.get('#y-label-input').should('have.value', 'Y Axis');

    // // Check data points
    // cy.wait(100);

    // cy.get('.x-value-input').eq(0).should('have.value', '1');
    // cy.get('.y-value-input').eq(0).should('have.value', '3');

    // cy.get('.x-value-input').eq(1).should('have.value', '2');
    // cy.get('.y-value-input').eq(1).should('have.value', '7');

    // cy.get('.x-value-input').eq(2).should('have.value', '3');
    // cy.get('.y-value-input').eq(2).should('have.value', '15');

    // cy.get('.x-value-input').eq(3).should('have.value', '4');
    // cy.get('.y-value-input').eq(3).should('have.value', '25');

    // cy.get('.x-value-input').eq(4).should('have.value', '5');
    // cy.get('.y-value-input').eq(4).should('have.value', '40');


    // Check labels
    cy.findByLabelText("X label").should('have.value', 'X Axis');
    cy.findByLabelText("Y label").should('have.value', 'Y Axis');

    // Check the X and Y values
    const dataPairs = [
        { x: '1', y: '3' },
        { x: '2', y: '7' },
        { x: '3', y: '15' },
        { x: '4', y: '25' },
        { x: '5', y: '40' },
    ];

    dataPairs.forEach((pair, index) => {
        cy.findAllByLabelText("X").eq(index).should('have.value', pair.x);
        cy.findAllByLabelText("Y").eq(index).should('have.value', pair.y);
    });

})

