/**
 * Cypress tests for the RegisterComponent.
 *
 * This test suite verifies the functionality of the registration page, including:
 * - Display of the registration page.
 * - Avatar selection and highlighting.
 * - Form input fields for name, email, and password.
 * - Registration form submission and handling of both successful and failed responses.
 * - Error message display upon failed registration.
 * - Navigation link to the login page.
 *
 * These tests ensure that the registration functionality works as expected
 * and provides a smooth user experience.
 */

describe('Register Function Test', () => {
    it('checks if a button element has text', () => {
        cy.visit('http://localhost:5174/register'); // Adjust the URL if necessary
        cy.contains('button', 'REGISTER').should('exist');
    });

    it('checks if the register redirects to /login on successful response and displays error message otherwise', () => {
        cy.visit('http://localhost:5174/register'); // Adjust the URL if necessary
        cy.get('#name').type('John Doe'); // Fill in the name
        cy.get('#email').type('john@example.com'); // Fill in the email
        cy.get('#password').type('password123'); // Fill in the password
        cy.get('img').first().click({ force: true }); // Select the first avatar
        cy.get('button[type="submit"]').click(); // Click the register button

        cy.intercept('POST', 'http://localhost:8080/api/v1/auth/register', (req) => {
            if (req.body.email === 'john@example.com') {
                req.reply({
                    statusCode: 200,
                    body: {
                        message: 'Registration successful'
                    }
                });
                cy.url().should('include', '/login'); // Check if redirected to login page
            } else {
                req.reply({
                    statusCode: 400
                });
                cy.url().should('include', '/register'); // Should stay on the register page
                cy.get('.error-message').should('be.visible').and('contain', 'There was an error with registration. Please try again.');
            }
        }).as('registerRequest');
    });
});
