// Command to login in the WooCommerce UI site
Cypress.Commands.add('loginUi', (email, password) => {
  cy.get('#username').type(email)
  cy.get('#password').type(password + '{enter}')
  cy.get('.woocommerce-MyAccount-navigation').should('be.visible')
  cy.contains('Log out').should('be.visible')
})

// Command to setup the API url and login in
Cypress.Commands.add('setApiUrl', (username, password) => {
  Cypress.config('baseUrl', 'http://' + username + ':' + password + Cypress.env('apiUrl'))
})

// Create a new product with basic info about it
Cypress.Commands.add('addProduct', (name, type, price, description, short_desc) => {
  cy.request({
    method: 'POST',
    url: '/wp-json/wc/v3/products/',
    auth: {
      user: Cypress.env('USERNAME'),
      pass: Cypress.env('PASSWORD')
    },
    body: {
      "name": name,
      "type": type,
      "regular_price": price,
      "description": description,
      "short_description": short_desc
    }
  })
})

Cypress.Commands.add('deleteProdByName', (name) => {
  cy.request({
    method: 'GET',
    url: '/wp-json/wc/v3/products/',
    auth: {
      user: Cypress.env('USERNAME'),
      pass: Cypress.env('PASSWORD')
    }
  }).then($response => {
    let prod_id = '';
    var i;
    for (i = 0; i < ($response.body).length; i++) {
      if (($response.body)[i]['name'] == name) {
        prod_id = ($response.body)[i]['id']
        break;
      }
      
    }
    if (prod_id != '') {
      cy.request({
        method:'DELETE',
        url: '/wp-json/wc/v3/products/'+prod_id,
        auth: {
          user: Cypress.env('USERNAME'),
          pass: Cypress.env('PASSWORD')
        }
      })
    }
    else {
      ($response.status) = 404;
      console.log('Producto no encontrado')
    }
  })
})