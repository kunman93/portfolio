import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit the portfolio", () => {
    cy.visit("/");
});

Then("I should see a title", () => {
    cy.get("#homeTitle").contains("Hi, I'm Manu");
});