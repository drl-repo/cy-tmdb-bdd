import { 
  Given,
  When,
  Then,
  And 
} from "cypress-cucumber-preprocessor/steps";

const username = Cypress.env('username')

Given('user clear favorite movie list', () => {
  cy.visit('/u/'+username+'/favorites')
  cy.get('.content .items_wrapper')
    .then(function(el){
      //clear if exist
      if(el.find('.card').length > 0){
        cy.wrap(el)
          .find('.title a')
          .each(function(item){
          
            cy.request({
              method: 'PUT',
              url: item.attr('href')+'/toggle-list-item',
              form: true,
              body: {
                type: 'favourite',
              },
            })
         
            cy.wait(500)
          })
      }
    })
})