Feature: The promotion service back-end
    As a Promotion developer
    I need a RESTful catalog service
    So that I can keep track of all my promotions


Scenario: The server is running
    When I send a GET request to the "Home Page"
    Then the response status code should be 200
    And the JSON response should have "name" equal to "Promotion REST API Service"
    And the JSON response should have "version" equal to "1.0"
