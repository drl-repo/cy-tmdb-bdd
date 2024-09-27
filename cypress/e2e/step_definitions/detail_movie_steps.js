import { 
  Given,
  When,
  Then,
  And 
} from "cypress-cucumber-preprocessor/steps";

Then('user should see detail movie page', () => {
  cy.url({ timeout: 12000 }).should('include','/movie/')
})

And('user click Mark as Favorite button', () => {
  //store movie title as reference
  cy.get('.title h2 a').invoke('text').as('favoritedMovie')
  cy.get('#favourite').click()
})

Then('Mark as Favorite icon color is {string}', (color) => {
  cy.get('#favourite')
    .find('.heart')
    .should((iconFavorite) => {
      if(color=='Pink'){
        expect(iconFavorite).to.have.class(true)
      }else{
        expect(iconFavorite).to.not.have.class(true)
      }
    })
})

And('Mark as Favorite button should show tooltip {string}', (tooltipMessage) => {
  cy.log(tooltipMessage)
  cy.get('.k-tooltip-content')
    .should('be.visible')
    .and('contain', tooltipMessage)
})