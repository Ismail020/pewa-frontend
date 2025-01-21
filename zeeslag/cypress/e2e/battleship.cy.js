import BattleShipGame from '../../src/components/GameUI/BattleShipGame.vue';

describe('BattleShipGame Component', () => {
    beforeEach(() => {
        cy.mount(BattleShipGame);
    });

    it('renders the game UI correctly', () => {
        cy.get('header').should('exist');
        cy.get('main').should('exist');
    });

    it('allows player 1 to take a valid shot', () => {
        cy.window().then(win => {
            win.app.handleAllShipsPlaced('p1');
            win.app.handleAllShipsPlaced('p2');
        });

        cy.get('BoardComponent').eq(1).within(() => {
            cy.get('.cell').eq(5).click();
        });

        cy.window().its('app.$data.p1Moves').should('include', 5);
        cy.window().its('app.$data.turn').should('equal', 'P2');
    });
});
