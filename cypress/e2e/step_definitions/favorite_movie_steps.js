import { 
  Given,
  When,
  Then,
  And 
} from "cypress-cucumber-preprocessor/steps";

Given('user at favorite movie page', () => {
  cy.visit('/u/'+Cypress.env('username')+'/favorites')
})

Then('user should see the favorited movie', function(){
  cy.log(this.favoritedMovie)

  cy.get('.content .items_wrapper')
    .should('contain', this.favoritedMovie)
})


Then('verify count of favorited movie more than one', function(){
  //title jumlah movie
  cy.get('.content .title_header h3:first-child span')
    .invoke('text').then(parseInt).should('be.gt', 1)

  cy.get('.content .items_wrapper .card')
    .its('length').should('be.gt', 1)
})



And('user remove favorited movie from their favorite list', function(){
  cy.get('.content .items_wrapper')
    .then(function(el){
      
      if(el.find('.card').length > 0){
        cy.wrap(el)
          .find('.card')
          .eq(0)
          .then((item)=>{
             cy.wrap(item).find('.title h2').invoke('text').as('deletedMovie')
             cy.wrap(item).find('.action_bar li').eq(3).click()
          })
      }
    })

})

And('favorited movie should be removed from list', function(){
  console.log(this.deletedMovie)
  cy.get('.content .items_wrapper')
    .should('not.contain', this.deletedMovie)
})


When(/^user sort by (\w+\s?\w+)/, (sortBy) => {

  cy.get('#account_scroll').scrollIntoView()
  cy.get('.content .items_wrapper')
    .then((el)=>{
      if(el.find('.card').length > 1){
        cy.get('header').invoke('hide')
        cy.get('.sort_filter .filters').realHover()
        cy.get('ul.filters')
          .should('be.visible')
          .then((el)=>{
            const sortOption = {
                //'Date Added'    : '#filter_by_created_at', //defaul sort
                'Popularity'    : '#filter_by_popularity',
                'Released Date' : '#filter_by_release_date'
              }

            if(sortOption.hasOwnProperty(sortBy)){
              cy.wrap(el)
                .find(sortOption[sortBy])
                .click({ scrollBehavior: false })
                cy.log('Sort by '+sortBy)
            }else{
              cy.log('invalid sort type !')
            }

          })
      }else{
        cy.log('Not Enought list to do test !')
      }
    })    

})


Then(/^list favorite movie should be sorted by (\w+\s?\w+)/, (sortBy) => {

  cy.get('.content .items_wrapper')
    .then((el)=>{
    if(el.find('.card').length > 1){
            
      const sortItemWrapper = {
        //'Date Added'    : '', //nanti kita isi kalau sudah ad info dr devnya :)
        //'Popularity'    : '',
        'Released Date' : '.release_date'
      }

      if(sortItemWrapper.hasOwnProperty(sortBy)){
          cy.wrap(el)
            .find(sortItemWrapper[sortBy])
            .should(function(elements){
              //get all data
              const arrDateReleased = Cypress._.map(elements, function(elOfDateReleased){
                return elOfDateReleased.innerText
              }).map(function(dateReleased){
                return new Date(dateReleased)
              })

              //sort and compare
              let sorted = Cypress._.sortBy(arrDateReleased)
              console.log(sorted)
             
              expect(arrDateReleased).to.deep.equal(sorted)
            })
        }

    }else{
      cy.log('Not Enought list to do test !')
    }
    
    })
})


