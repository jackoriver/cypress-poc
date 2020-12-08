/// <reference types="cypress" />


describe('API Products testing', () => {

  // before(() => {
  //   cy.setApiUrl(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
  // })

  it('Verify list of products is returned', function (){
    cy.setApiUrl(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    cy.request('/products').then(($response) => {
      expect($response.status).to.eq(200)
      expect($response).to.have.property('headers')
      expect($response).to.have.property('duration')
      expect($response.body).to.have.lengthOf(10)
    })
  })

  it('Add a new product by fixture file', () => {
    cy.setApiUrl(Cypress.env('USERNAME'), Cypress.env('PASSWORD'))
    cy.fixture('product').then(product => {
      cy.request('POST', '/products/', product.product_1)
        .then((response) => {
          expect(response.status).to.eq(201)
          expect(response.statusText).to.eq('Created')
          expect(response.body).to.have.property('name','Catta T-Shirt', 'The value is incorrect')
        })
    })
  })

  it('Add new product from Commands', () => {
    cy.addProduct('Jack-T-shirt', 'simple', '14.99', 'long description', 'short desc')
      .then((response) => {
        expect(response.status).to.eq(201)
    })
  })

  it.only('Delete a Product by name', () => {
    cy.deleteProdByName('Catta T-Shirt').its('status').should('eq', 200, 'Product not found')
  })
})