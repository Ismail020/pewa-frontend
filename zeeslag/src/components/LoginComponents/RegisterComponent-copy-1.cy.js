import RegisterComponent from './RegisterComponent.vue'

describe('<RegisterComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RegisterComponent)
  })
})