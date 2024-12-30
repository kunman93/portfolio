import { When, Then, Given, DataTable } from "@badeball/cypress-cucumber-preprocessor";

Given('the user is using a mobile device', () => {
    cy.viewport('iphone-6');
});

Given('the user is on the following section', (table: DataTable) => {
    const tableRow = table.hashes()[0];
    cy.visit(tableRow['route']);

    assertSectionAndTitle(tableRow['section_selector'], tableRow['section_title']);
});

When('the user clicks on the dropdown menu', () => {
    cy.get('#menuButton').click({ force: true });
});

When('the user clicks on the following nav button', (table: DataTable) => {
    cy.get(table.hashes()[0]['nav_button']).click({ force: true });
});

Then('the user is navigated to the following section', (table: DataTable) => {
    const tableRow = table.hashes()[0];
    cy.url().should('eq', Cypress.config().baseUrl + tableRow['route']);

    assertSectionAndTitle(tableRow['section_selector'], tableRow['section_title']);
});

const assertSectionAndTitle = (sectionSelector: string, sectionTitle: string) => {
    cy
        .get(sectionSelector)
        .should('be.visible')
        .within(() => {
            cy.get('h1, h2')
                .first()
                .should('have.text', sectionTitle);
        });
}