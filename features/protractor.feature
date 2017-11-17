Feature: To search protractor in google

    @ProtractorScenario
    Scenario: Protractor Google
      Given I am on cucumber page with title "cucumber - Google Search"
      When I type "protractor"
      Then I click search button
      Then I clear search textbox
