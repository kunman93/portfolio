import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('the user is on the contact section', () => {
    cy.visit('/#contact');
    assertSectionAndTitle('app-contact', 'Contact Me.');
});

const assertSectionAndTitle = (
    sectionSelector: string,
    sectionTitle: string
) => {
    cy
        .get(sectionSelector)
        .should('be.visible')
        .within(() => {
            cy.get('h1, h2')
                .first()
                .should('have.text', sectionTitle);
        });
}

When('the user enters the name {string}, the email {string} and the message {string}', (
    name: string,
    email: string,
    message: string
) => {
    enterText('#name', name);
    enterText('#email', email);
    enterText('#message', message);
});

const enterText = (fieldId: string, text: string) => {
    if (text) {
        cy.get(fieldId).type(text, { force: true });
    } else {
        cy.get(fieldId).click({ force: true });
    }
}

When('the user clicks on the send button', () => {
    cy.fixture('emailJSResponseStatus').then((emailJSResponseStatusJson) => {
        cy.intercept({
            method: 'POST',
            url: '/api/v1.0/email/send',
            hostname: 'api.emailjs.com',
        }, emailJSResponseStatusJson).as('sendEmail');
    });

    cy.get('#submitButton').click({ force: true });
    cy.wait('@sendEmail');
});

Then('a toaster appears', () => {
    cy.get('app-toast').should('be.visible');
});

Then('the send button is disabled', () => {
    cy.get('#submitButton').should('be.disabled');
});