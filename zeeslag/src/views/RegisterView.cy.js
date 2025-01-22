import RegisterView from './RegisterView.vue'

describe('<RegisterView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RegisterView)
  })
})