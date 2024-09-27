// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  
  cy.session('loginByUi', () => {
     
		cy.visit('/login')
      
      cy.get('#onetrust-reject-all-handler', { timeout: 12000 }).click()  
      
    	cy.get('#username').type(username)
    	cy.get('#password').type(password)
    	cy.get('#login_button').click()
    	cy.url().should('contain', '/u/'+username)
  })
  
})

Cypress.Commands.add('setLanguage', (lang) => {
  let userPreference = JSON.stringify({ 
      "adult":false,
      "i18n_fallback_language":"en-US",
      "locale":lang.locale, ////bn-BD
      "country_code":lang.country_code,
      "timezone":"Asia/Jakarta"
  })
  cy.clearCookie('preferences')
  cy.setCookie('preferences', encodeURIComponent(userPreference))
  cy.log('language has been set')
  //cy.wait(500)

})