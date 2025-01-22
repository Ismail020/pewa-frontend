describe('RegisterComponent', () => {
    beforeEach(() => {
        // Navigate to the Register page before each test
        cy.visit('http://localhost:5173/register');
    });

    it('should load the Register page with all elements', () => {
        // Check if the main header is displayed
        cy.get('h1').contains('Register').should('be.visible');

        // Check for avatars
        cy.get('img').should('have.length', 2);

        // Check input fields and the register button
        cy.get('input#name').should('be.visible');
        cy.get('input#email').should('be.visible');
        cy.get('input#password').should('be.visible');
        cy.get('select').should('be.visible');
        cy.get('button#registerButton').contains('REGISTER').should('be.visible');
    });

    it('should select an avatar', () => {
        // Select the first avatar
        cy.get('img').first().click();

        // Verify the avatar is selected
        cy.get('img').first().should('have.class', 'selected-avatar');
    });

    it('should display an error message for empty fields', () => {
        // Click the register button without filling the form
        cy.get('button#registerButton').click();

        // Verify error message is displayed
        cy.get('.error-message').should('be.visible')
            .and('contain', 'There was an error with registration. Please try again.');
    });

    it('should fill the form and register successfully', () => {
        // Select an avatar
        cy.get('img').first().click();

        // Fill in the name, email, password, and country
        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('john.doe@example.com');
        cy.get('input#password').type('password123');
        cy.get('select').select('Netherlands');

        // Stub the network request for registration
        cy.intercept('POST', '/api/v1/auth/register', {
            statusCode: 200,
            body: { message: 'Registration successful' },
        }).as('registerRequest');

        // Click the register button
        cy.get('button#registerButton').click();

        // Verify the API request was sent with the correct payload
        cy.wait('@registerRequest').its('request.body').should('deep.equal', {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            avatar: '/path/to/selected/avatar.png', // Adjust the path if necessary
            location: 'Netherlands',
        });

        // Verify redirection to the login page
        cy.url().should('include', '/login');
    });

    it('should handle a failed registration', () => {
        // Fill in the form with valid details
        cy.get('img').first().click();
        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('john.doe@example.com');
        cy.get('input#password').type('password123');
        cy.get('select').select('Netherlands');

        // Stub the network request to simulate a server error
        cy.intercept('POST', '/api/v1/auth/register', {
            statusCode: 500,
            body: { message: 'Registration failed' },
        }).as('registerRequest');

        // Click the register button
        cy.get('button#registerButton').click();

        // Wait for the request and verify error handling
        cy.wait('@registerRequest');
        cy.get('.error-message').should('be.visible')
            .and('contain', 'There was an error with registration. Please try again.');
    });
});
