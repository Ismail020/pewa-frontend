import RegisterComponent from '../../src/components/LoginComponents/RegisterComponent.vue';

describe('Register Component', () => {
    beforeEach(() => {
        // Mount the RegisterComponent before each test
        cy.mount(RegisterComponent);
    });

    it('renders the registration form correctly', () => {
        // Check that the form contains all necessary fields and elements
        cy.get('h1').should('contain.text', 'Register');
        cy.get('input#name').should('exist').and('have.attr', 'placeholder', 'Name');
        cy.get('input#email').should('exist').and('have.attr', 'placeholder', 'Email');
        cy.get('input#password').should('exist').and('have.attr', 'placeholder', 'Password');
        cy.get('select').should('exist').and('contain', 'Select your country');
        cy.get('button#registerButton').should('exist').and('contain.text', 'REGISTER');
        cy.get('.error-message').should('not.exist'); // Error message should not be visible initially
    });

    it('validates required fields before submission', () => {
        // Click the register button without filling in any fields
        cy.get('button#registerButton').click();

        // Assert error message appears
        cy.get('.error-message').should('exist').and('contain.text', 'There was an error with registration. Please try again.');
    });

    it('allows selecting an avatar', () => {
        // Select the first avatar
        cy.get('img').first().click();

        // Verify the avatar is selected
        cy.get('img').first().should('have.class', 'selected-avatar');
    });

    it('submits the form with valid data', () => {
        // Fill in the form fields
        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('johndoe@example.com');
        cy.get('input#password').type('password123');
        cy.get('select').select('Netherlands');
        cy.get('img').first().click(); // Select an avatar

        // Mock the fetch API call
        cy.intercept('POST', '**/api/v1/auth/register', {
            statusCode: 200,
            body: { success: true },
        }).as('registerRequest');

        // Submit the form
        cy.get('button#registerButton').click();

        // Verify that the request was made with the correct data
        cy.wait('@registerRequest').its('request.body').should((body) => {
            expect(body).to.have.property('name', 'John Doe');
            expect(body).to.have.property('email', 'johndoe@example.com');
            expect(body).to.have.property('password', 'password123');
            expect(body).to.have.property('location', 'Netherlands');
        });

        // Check that the user is redirected to the login page
        cy.url().should('include', '/login');
    });

    it('shows an error message on failed registration', () => {
        // Fill in the form fields
        cy.get('input#name').type('Jane Doe');
        cy.get('input#email').type('janedoe@example.com');
        cy.get('input#password').type('password123');
        cy.get('select').select('Germany');
        cy.get('img').first().click(); // Select an avatar

        // Mock a failed API call
        cy.intercept('POST', '**/api/v1/auth/register', {
            statusCode: 400,
            body: { error: 'Invalid data' },
        }).as('registerFail');

        // Submit the form
        cy.get('button#registerButton').click();

        // Verify that the error message is displayed
        cy.wait('@registerFail');
        cy.get('.error-message').should('exist').and('contain.text', 'There was an error with registration. Please try again.');
    });
});
