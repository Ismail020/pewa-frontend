describe('Login Component Test', () => {
    it('checks if a button element has text', () => {
        cy.visit('localhost:5173/login')
        cy.contains('button', 'Log in').should('exist')
    })
    it('checks if the login redirects to "/selectgamemode" on ok response from server and stays on same page otherwise', () => {
        cy.visit('localhost:5173/login')
        cy.get('input[type=email]').type('jd@gmail.com')
        cy.get('input[type=password]').type('password')
        cy.get('button[type="submit"]').click()
        cy.intercept('http://localhost:5173/login', () => {
            if (!response.ok) {
                cy.url().contains('selectgamemode')
            } else cy.url().contains('login')
        })
    })
    it ("checks for error message", () => {
        cy.intercept('POST', '/api/login', {
            statusCode: 200,
            body: { token: 'fake-jwt-token' },
        }).as('loginRequest');

                cy.get(".message")
                    .should("be.visible")
        })
})
