import { 
  Given,
  When,
  Then,
  And 
} from "cypress-cucumber-preprocessor/steps";

Given('user at home page', () => {
  cy.visit('/')
 

})

When('user choose movie at number {int}', (number) => {
  
  cy.get('section.trending .column_header > h2')
    .scrollIntoView()

  cy.get('#trending_scroller .column_content')
    .invoke('attr','class')
    .should('include','loaded')
  
  //ada movie, ada tv kita pilih movie only
  cy.get('#trending_scroller .column_content .card')
    .find('h2 a')
    .filter('[href^="/movie/"]')
    .eq(number-1).click()
  cy.wait(500) //just wait reload page

})