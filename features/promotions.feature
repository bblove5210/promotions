Feature: The promotion service back-end
    As a Promotion Manager
    I need RESTful management service
    So that I can keep track of all my promotions

    Background:
        Given the following promotions
            | name      | category           | discount_x | discount_y | description | product_id | validity | start_date | end_date   |
            | some name | SPEND_X_GET_Y_FREE | 25         | 10         | sale        | 123        | true     | 2025-01-01 | 2025-06-01 |