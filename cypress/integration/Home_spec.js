/// <reference types="cypress" />

/// <reference types="cypress" />

describe('Login functionality', () => {
  beforeEach(() => {
    cy.visit('http://10.0.37.32:8000/')
  })

  it('Verify Home Page sections are present', () => {
    cy.get('.wp-block-cover.alignfull').should('be.visible')
    cy.contains('Shop by Category').should('be.visible')
    cy.contains('New In').should('be.visible')
    cy.contains('We Recommend').should('be.visible')
    cy.contains('Fan Favorites').should('be.visible')
    cy.contains('On Sale').should('be.visible')
    cy.contains('Best Sellers').should('be.visible')
  })
})