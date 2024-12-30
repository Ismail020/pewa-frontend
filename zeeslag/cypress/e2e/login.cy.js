describe('Login Function Test', () => {
    it('checks if a button element has text', () => {
        cy.visit('localhost:5173/login')
        cy.contains('button', 'LOGIN').should('exist')
    })
    it('checks if the login redirects to /play on ok response from server and stays on same page otherwise', () => {
        cy.visit('localhost:5173/login')
        cy.get('input[type=text]').type('jd@gmail.com')
        cy.get('input[type=password]').type('password')
        cy.get('button[type="submit"]').click()
        cy.intercept('http://localhost:5173/login', () => {
            if (!response.ok) {
                cy.url().contains('play')
            } else cy.url().contains('login')
            cy.get('#hidden').invoke('show')
        })
    })
})
