import { 
  Before,
  After
} from "cypress-cucumber-preprocessor/steps";

const username = Cypress.env('username')
const password = Cypress.env('password') 

/* Note that this hooks will be run based on the below position */


Before({tags: '@must-logged-in'}, ()=>{
  cy.login(username, password)
  cy.log('login')
})

Before({tags: '@lang-id'}, ()=>{
  cy.setLanguage({ locale: 'id-ID', country_code: 'ID'})
  cy.log('set bahasa')
})

Before({tags: '@lang-en'}, ()=>{
  cy.setLanguage({ locale: 'en-US', country_code: 'US'})
  cy.log('set inggris')
})

Before({tags: '@close-cookie-box'}, ()=>{
  cy.setCookie('OptanonAlertBoxClosed', '2024-09-26T13:55:25.978Z')
  cy.log('close cookie')
})



