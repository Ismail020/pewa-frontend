describe('Login Function Test', () => {
    it('checks if a button element has text', () => {
        cy.visit('localhost:5173/login')
        cy.contains('button', 'LOGIN').should('exist')
    })
    it('checks if the login redirects to /play on ok response from server', () => {
        cy.visit('localhost:5173/login')
        cy.get('input[type=text]').type('jd@gmail.com')
        cy.get('input[type=password]').type('password')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', "play")
    })
})
