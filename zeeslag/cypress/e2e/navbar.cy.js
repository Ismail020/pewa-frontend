import Navbar from "../../src/components/NavbarComponent.vue";

describe('Navbar Component', () => {

    beforeEach(() => {
        // Mount the Navbar component
        cy.mount(Navbar);
    });

    it('renders the navbar with all links', () => {
        // Check that the navbar has the correct links
        cy.get('nav').within(() => {
            cy.contains('Home').should('have.attr', 'href', '/');
            cy.contains('About').should('have.attr', 'href', '/about');
            cy.contains('Play now').should('have.attr', 'href', '/selectgamemode');
            cy.contains('Register').should('have.attr', 'href', '/register');
            cy.contains('Log In').should('have.attr', 'href', '/login');
        });
    });

    it('opens the Help modal when "Help" link is clicked', () => {
        // Click on the Help link
        cy.contains('Help').click();

        // Check if the modal opens
        cy.get('.bg-black').should('exist'); // Modal backdrop
        cy.get('.bg-white').should('exist'); // Modal content
        cy.get('.text-2xl').contains('Battleship Game Rules'); // Modal title
    });

    it('closes the Help modal when clicked outside the modal', () => {
        // Open the modal first
        cy.contains('Help').click();

        // Click outside the modal (on the backdrop)
        cy.get('.bg-black').click();

        // Ensure the modal is closed (backdrop disappears)
        cy.get('.bg-black').should('not.exist');
        cy.get('.bg-white').should('not.exist');
    });

    it('closes the Help modal when the modal background is clicked', () => {
        // Open the modal first
        cy.contains('Help').click();

        // Click on the modal's backdrop (itself) to close
        cy.get('.fixed').click('topRight'); // Assuming click on the backdrop
        cy.get('.bg-black').should('not.exist'); // Ensure the modal is closed
    });

    it('ensures the links are not broken', () => {
        // Test all links to make sure they route correctly
        cy.contains('Home').click();
        cy.url().should('include', '/');
        cy.contains('About').click();
        cy.url().should('include', '/about');
        cy.contains('Play now').click();
        cy.url().should('include', '/selectgamemode');
        cy.contains('Register').click();
        cy.url().should('include', '/register');
        cy.contains('Log In').click();
        cy.url().should('include', '/login');
    });

});
