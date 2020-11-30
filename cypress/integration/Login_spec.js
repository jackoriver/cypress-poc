/// <reference types="cypress" />

describe('Login functionality', () => {
  beforeEach(() => {
    cy.visit('http://10.0.37.32:8000/my-account/')
  })

  it('Login Successfully', () =>{
    cy.get('#username').type('automation')
    cy.get('#password').type('automation {enter}')
    cy.get('.woocommerce-MyAccount-navigation').should('be.visible')
    cy.contains('Log out').should('be.visible')
  })

  it('Login with empty password', () => {
    cy.get('#username').type('automation')
    cy.get('[name="login"]').click()
    cy.get('.woocommerce-error').should('include.text', 'The password field is empty.')
  })

  it('Login with empty username', () => {
    cy.get('#password').type('automation')
    cy.get('[name="login"]').click()
    cy.get('.woocommerce-error').should('include.text', 'Error: Username is required.')
    
  })

  it('Login with incorrect password', () => {
    cy.get('#username').type('automation')
    cy.get('#password').type('wrong {enter}')
    cy.get('.woocommerce-error').should('include.text', 'Error: The password you entered for the username automation is incorrect. Lost your password?')
  })
})


