Feature: To search allure reports in google

    @AllureScenario
    Scenario: Allure Reports Google
      Given I am on google page
      When I type "allure reports"
      Then I click search button "input[value='Google Search']"
      Then I clear search textbox "#lst-ib"
