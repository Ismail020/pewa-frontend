import AgainstPlayerUIView from './AgainstPlayerUIView.vue'

describe('<AgainstPlayerUIView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(AgainstPlayerUIView)
  })
})