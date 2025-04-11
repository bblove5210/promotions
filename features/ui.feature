Feature: The promotions service back-end
    As a promotions developer
    I need a RESTful catalog service
    So that I can keep track of all my promotions

Scenario: The server is running
    When I visit the "Home Page"
    Then I should see "Promotions Demo RESTful Service" in the title
    And I should not see "404 Not Found"
