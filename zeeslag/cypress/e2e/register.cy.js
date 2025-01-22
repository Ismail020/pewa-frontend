import RegisterComponent from '../../src/components/LoginComponents/RegisterComponent.vue';

describe('Register Component', () => {
    // Mount de RegisterComponent voor elke test
    beforeEach(() => {
        cy.mount(RegisterComponent);
    });

    // Test 1: Controleer of het registratieformulier correct wordt weergegeven
    it('renders the registration form correctly', () => {
        // Controleer of de titel "Register" wordt weergegeven
        cy.get('h1').should('contain.text', 'Register');
        // Controleer of het naamveld bestaat en de juiste placeholder heeft
        cy.get('input#name').should('exist').and('have.attr', 'placeholder', 'Name');
        // Controleer of het e-mailveld bestaat en de juiste placeholder heeft
        cy.get('input#email').should('exist').and('have.attr', 'placeholder', 'Email');
        // Controleer of het wachtwoordveld bestaat en de juiste placeholder heeft
        cy.get('input#password').should('exist').and('have.attr', 'placeholder', 'Password');
        // Controleer of de selectielijst voor landen bestaat en een standaardwaarde heeft
        cy.get('select').should('exist').and('contain', 'Select your country');
        // Controleer of de registerknop bestaat en de juiste tekst bevat
        cy.get('button#registerButton').should('exist').and('contain.text', 'REGISTER');
        // Controleer of de foutmelding niet zichtbaar is bij initiële weergave
        cy.get('.error-message').should('not.exist');
    });

    // Test 2: Controleer validatie van verplichte velden
    it('validates required fields before submission', () => {
        // Klik op de registerknop zonder gegevens in te vullen
        cy.get('button#registerButton').click();

        // Controleer of de foutmelding wordt weergegeven
        cy.get('.error-message').should('exist').and('contain.text', 'There was an error with registration. Please try again.');
    });

    // Test 3: Controleer of een avatar kan worden geselecteerd
    it('allows selecting an avatar', () => {
        // Klik op de eerste avatar
        cy.get('img').first().click();

        // Controleer of de geselecteerde avatar de juiste CSS-klasse heeft
        cy.get('img').first().should('have.class', 'selected-avatar');
    });

    // Test 4: Controleer of het formulier correct wordt verzonden met geldige gegevens
    it('submits the form with valid data', () => {
        // Vul het formulier in
        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('johndoe@example.com');
        cy.get('input#password').type('password123');
        cy.get('select').select('Netherlands');
        cy.get('img').first().click(); // Selecteer een avatar

        // Mock de API-aanroep voor succesvolle registratie
        cy.intercept('POST', '**/api/v1/auth/register', {
            statusCode: 200,
            body: { success: true },
        }).as('registerRequest');

        // Klik op de registerknop
        cy.get('button#registerButton').click();

        // Controleer of de juiste gegevens naar de API zijn verzonden
        cy.wait('@registerRequest').its('request.body').should((body) => {
            expect(body).to.have.property('name', 'John Doe');
            expect(body).to.have.property('email', 'johndoe@example.com');
            expect(body).to.have.property('password', 'password123');
            expect(body).to.have.property('location', 'Netherlands');
        });

        // Controleer of de gebruiker wordt doorgestuurd naar de loginpagina
        cy.url().should('include', '/login');
    });

    // Test 5: Controleer foutafhandeling bij mislukte registratie
    it('shows an error message on failed registration', () => {
        // Vul het formulier in
        cy.get('input#name').type('Jane Doe');
        cy.get('input#email').type('janedoe@example.com');
        cy.get('input#password').type('password123');
        cy.get('select').select('Germany');
        cy.get('img').first().click(); // Selecteer een avatar

        // Mock een mislukte API-aanroep
        cy.intercept('POST', '**/api/v1/auth/register', {
            statusCode: 400,
            body: { error: 'Invalid data' },
        }).as('registerFail');

        // Klik op de registerknop
        cy.get('button#registerButton').click();

        // Controleer of de foutmelding wordt weergegeven
        cy.wait('@registerFail');
        cy.get('.error-message').should('exist').and('contain.text', 'There was an error with registration. Please try again.');
    });
});
