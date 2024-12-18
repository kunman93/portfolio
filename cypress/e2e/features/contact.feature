Feature: Send an email through the contact form

  Background:
    Given the user is on the contact section

  Scenario: The user sends an email through the contact form
    When the user enters the name "Clark Kent", the email "clark.kent@smallville.org" and the message "I'm Kal-El from Krypton, actuall from Cypress"
    And the user clicks on the send button
    Then a toaster appears

  Scenario Outline: The user fills out the contact form incorrectly
    When the user enters the name "<name>", the email "<email>" and the message "<message>"
    Then the send button is disabled

    Examples:
      | name       | email                     | message    |
      |            | clark.kent@smallville.org | I'm Kal-El |
      | Clark Kent |                           | I'm Kal-El |
      | Clark Kent | invalid email             | I'm Kal-El |
      | Clark Kent | clark.kent@smallville.org |            |
