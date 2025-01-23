import LogComponent from '../../src/components/LogComponent.vue'; // Ensure the path is correct

describe('LogComponent', () => {
    it('should render the title correctly', () => {
        const title = 'Game Moves';
        const moves = [1, 12, 23];  // Example moves

        cy.mount(LogComponent, {
            props: { title, moves }
        });

        // Assert the title is rendered
        cy.get('h2').should('have.text', title);
    });

    it('should render the moves correctly', () => {
        const title = 'Game Moves';
        const moves = [1, 12, 23];  // Example moves

        cy.mount(LogComponent, {
            props: { title, moves }
        });

        // Assert that moves are displayed correctly in the list
        cy.get('ul').children().should('have.length', moves.length);

        moves.forEach((move, index) => {
            const translatedMove = String.fromCharCode(Math.floor((move - 1) / 10) + 65) + ((move - 1) % 10 + 1);
            cy.get('ul').children().eq(index).should('contain.text', `${index + 1}: ${translatedMove} + ${move}`);
        });
    });

    it('should correctly translate a move ID to coordinates', () => {
        const wrapper = mount(LogComponent, {
            props: { title: 'Game Moves', moves: [] }
        });

        // Test translateMove method directly by invoking it in the test
        const moveId = 12;
        const translatedMove = wrapper.vm.translateMove(moveId);
        expect(translatedMove).to.equal('B2');  // Expect the translated move to be B2 (because row=1, col=2)
    });
});
