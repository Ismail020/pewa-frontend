import BattleShipGame from '../../src/components/GameUI/BattleShipGame.vue';

describe('BattleShipGame Component', () => {
    // Voer voor elke test de volgende actie uit:
    beforeEach(() => {
        // Mount de BattleShipGame component in een virtuele Cypress-browser.
        cy.mount(BattleShipGame);
    });

    // Test of de UI correct wordt gerenderd
    it('renders the game UI correctly', () => {
        // Controleer of het header-element aanwezig is in de DOM.
        cy.get('header').should('exist');

        // Controleer of het main-element (de kern van het spel) aanwezig is in de DOM.
        cy.get('main').should('exist');
    });

    // Test of speler 1 een geldige zet kan doen
    it('allows player 1 to take a valid shot', () => {
        // Simuleer dat beide spelers hun schepen hebben geplaatst
        cy.window().then(win => {
            // Roep de methode aan om aan te geven dat speler 1 al zijn schepen heeft geplaatst
            win.app.handleAllShipsPlaced('p1');
            // Roep de methode aan om aan te geven dat speler 2 al zijn schepen heeft geplaatst
            win.app.handleAllShipsPlaced('p2');
        });

        // Selecteer het bord van speler 2 (tegenstander) en klik op een cel om een zet te doen
        cy.get('BoardComponent').eq(1).within(() => {
            // Klik op cel 5 (bijvoorbeeld een specifiek vakje op het bord)
            cy.get('.cell').eq(5).click();
        });

        // Controleer of de zet van speler 1 correct is geregistreerd
        cy.window().its('app.$data.p1Moves').should('include', 5);

        // Controleer of de beurt is overgegaan naar speler 2
        cy.window().its('app.$data.turn').should('equal', 'P2');
    });
});
