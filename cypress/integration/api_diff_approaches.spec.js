/// <reference types="cypress" />


describe('API Products testing', () => {

  before(() => {
    cy.setApiUrl('automation', 'automation')
    // cy.log(Cypress.config('baseUrl'))
    // Cypress.config('baseUrl', 'http://automation:automation@10.0.37.32:8000/wp-json/wc/v3')
    // cy.request('http://automation:automation@10.0.37.32:8000/wp-json/wc/v3/products').as('respuesta')
  })

  it.only('Verify connection is established', function (){
    // let $response = this.respuesta
    cy.request('/products').then(($response) => {
      expect($response.status).to.eq(200)
      expect($response).to.have.property('headers')
      expect($response).to.have.property('duration')
      // let data = ($response.body)
      // var i;
      // for (i = 0; i < ($response.body).length; i++) {
        
      //   console.log("this fucking message was hard: " + ($response.body)[i]['name']);
      // }
    })
  })
  it('Add a new product', () => {
    cy.request('POST', '/products/',
    {
      "name": "Catta T-Shirt",
      "type": "simple",
      "regular_price": "14.99",
      "description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
      "short_description": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
      "categories": [
        {
          "id": 9
        },
        {
          "id": 14
        }
      ]
    })
    .then((response) => {
      expect(response.status).to.eq(201)
      expect(response.statusText).to.eq('Created')
    })
  })

  it('Test', () => {
    cy
    .request('/products')
    // .its('body').its('length').should('eq', 10)
    .its('body').should('have.length', 10)
  })

  it('Delete', () => {
    cy
    .request('Delete','/products/168')
    // .its('body').its('length').should('eq', 10)
    .its('statusText').should('eq', 'OK')
  })

})