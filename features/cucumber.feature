Feature: To search cucumber in google

    @CucumberScenario
    Scenario: Cucumber Google
      Given I am on allure page with title "allure reports - Google Search"
      When I type "cucumber"
      Then I click search button
      Then I clear search textbox
