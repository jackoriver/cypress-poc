/// <reference types="cypress" />

describe('Test the navbar', () => {
  beforeEach(() => {
    cy.visit('http://10.0.37.32:8000/')
  })

  it.only('Verify the Page Header is present', () => {
    cy.get('#masthead')
      .should('be.visible')
    cy.get('#masthead .site-branding .beta.site-title')
      .should('be.visible')
      .and('have.text', 'Testing Playground')
    cy.get('#masthead .site-branding .site-description')
      .should('be.visible')
      .and('have.text', 'This is a real-world app built with wordpress to be used as a playground environment')
    cy.get('.site-search')
      .should('be.visible')
    cy.get('#menu-custom-menu')
      .should('be.visible')
    cy.get('#menu-custom-menu > li')
      .should('have.length', 3)
    cy.get('#site-header-cart span.woocommerce-Price-amount')
      .should('be.visible')
    cy.get('#site-header-cart span.count')
      .should('be.visible')
  })

})