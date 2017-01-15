Feature: To test the postgreSQL database connection

@DatabaseTest
Scenario: postgres database connection
  Given I successfully connect to PostgreSQL
  When I query the table name & see the results
  Then I close the database connection