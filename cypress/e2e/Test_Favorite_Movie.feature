@MAF
Feature: Mark movie as Favorite
    
    User dapat menyimpan Movie kedalam daftar favorit mereka
    movies favorit akan tampil pada halaman favorite dari masing-masing user

    @must-logged-in
    Scenario: Clear favorite movie list
      Given user clear favorite movie list

    @close-cookie-box @lang-id
    Scenario: Users can only “mark as favorite” when they are logged in
        Given user at home page
        When user choose movie at number 1
        Then user should see detail movie page
        And user click Mark as Favorite button
        Then Mark as Favorite icon color is 'Not Pink'
        And Mark as Favorite button should show tooltip 'Masuk untuk menambahkan film ke daftar sukaan anda'
    
    @must-logged-in @lang-id
    Scenario: User can mark movie as favorite
      Given user at home page
      When user choose movie at number 2
      Then user should see detail movie page
      And user click Mark as Favorite button
      Then Mark as Favorite icon color is 'Pink'
      Given user at favorite movie page
      Then user should see the favorited movie

    @must-logged-in @lang-id
    Scenario: User can mark movie as favorite more than once
      Given user at home page
      When user choose movie at number 4
      Then user should see detail movie page
      And user click Mark as Favorite button
      Then Mark as Favorite icon color is 'Pink'
      Given user at favorite movie page
      Then user should see the favorited movie
      And verify count of favorited movie more than one

    @must-logged-in @lang-id
    Scenario: User can remove movie from their favorite list
      Given user at favorite movie page
      And user remove favorited movie from their favorite list
      Then favorited movie should be removed from list

    @must-logged-in @lang-id
    Scenario Outline: We Need minimum 3 item to test sorting test, so add again
      Given user at home page
      When user choose movie at number <number>
      Then user should see detail movie page
      And user click Mark as Favorite button
      Then Mark as Favorite icon color is 'Pink'

      Examples:
        | number|
        |    6  |
        |    8  |

    @must-logged-in @lang-en
    Scenario: User can sorting their favorited movie by released date
      Given user at favorite movie page
      When user sort by Released Date
      Then list favorite movie should be sorted by Released Date
