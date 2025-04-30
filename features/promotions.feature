Feature: The promotion service back-end
    As a Promotion Manager
    I need RESTful management service
    So that I can keep track of all my promotions

    Background:
        Given the following promotions
            | name   | category              | discount_x | discount_y | description              | product_id | validity | start_date | end_date   |
            | first  | SPEND_X_SAVE_Y        | 25         | 10         | sale                     | 123        | true     | 2025-01-01 | 2025-06-01 |
            | second | BUY_X_GET_Y_FREE      | 1          | 1          | two for the price of one | 100        | true     | 2025-01-01 | 2025-07-01 |
            | third  | PERCENTAGE_DISCOUNT_X | 50         | 0          | half price               | 101        | false    | 2025-02-01 | 2025-08-01 |

    Scenario: The server is running
        When I visit the "Home Page"
        Then I should see "Promotion RESTful Service" in the title
        And I should not see "404 Not Found"

    Scenario: Create a Promotion
        When I visit the "Home Page"
        And I set the "Name" to "New Sale"
        And I select "Spend X Save Y" in the "Category" dropdown
        And I set the "Discount X" to "100"
        And I set the "Discount Y" to "20"
        And I set the "Description" to "Some description"
        And I set the "Product ID" to "5"
        And I set the "Start Date" to "01-01-2025"
        And I set the "End Date" to "01-01-2026"
        And I press the "Create" button
        Then I should see the message "Success"
        When I copy the "Id" field
        And I press the "Clear" button
        Then the "Id" field should be empty
        And the "Name" field should be empty
        And the "Discount X" field should be empty
        And the "Discount Y" field should be empty
        And the "Description" field should be empty
        And the "Product ID" field should be empty
        When I paste the "Id" field
        And I press the "Retrieve" button
        Then I should see the message "Success"
        And I should see "New Sale" in the "Name" field
        And I should see "Spend X Save Y" in the "Category" dropdown
        And I should see "100" in the "Discount X" field
        and I should see "20" in the "Discount Y" field
        And I should see "Some description" in the "Description" field
        And I should see "5" in the "Product ID" field
        And I should see "True" in the "Validity" dropdown
        And I should see "2025-01-01" in the "Start Date" field
        And I should see "2026-01-01" in the "End Date" field

    Scenario: List all promotions
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "first" in the results
        And I should see "second" in the results
        And I should see "third" in the results
        And I should not see "this thing" in the results

    Scenario: Search for spend X save Y
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I select "Spend X Save Y" in the "Category" dropdown
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "first" in the results
        And I should not see "second" in the results
        And I should not see "third" in the results

    Scenario: Search for second
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Name" to "second"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "second" in the results
        And I should not see "first" in the results
        And I should not see "third" in the results

    Scenario: Search for valid
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I select "True" in the "Validity" dropdown
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "first" in the results
        And I should see "second" in the results
        And I should not see "third" in the results

    Scenario: Search for start date of 02-01-2025
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Start Date" to "02-01-2025"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "third" in the results
        And I should not see "first" in the results
        And I should not see "second" in the results

    Scenario: Search for end date of 07-01-2025
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "End Date" to "07-01-2025"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "second" in the results
        And I should not see "first" in the results
        And I should not see "third" in the results

    Scenario: Search for product ID of 101
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Product ID" to "101"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "third" in the results
        And I should not see "first" in the results
        And I should not see "second" in the results

    Scenario: Update a Promotion
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Name" to "first"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "first" in the "Name" field
        When I change "Name" to "fourth"
        And I press the "Update" button
        Then I should see the message "Success"
        When I copy the "Id" field
        And I press the "Clear" button
        And I paste the "Id" field
        And I press the "Retrieve" button
        Then I should see the message "Success"
        And I should see "fourth" in the "Name" field
        When I press the "Clear" button
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "fourth" in the results
        And I should not see "first" in the results

    Scenario: Retrieve a Promotion
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Name" to "first"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "first" in the "Name" field
        When I copy the "Id" field
        And I press the "Clear" button
        And I paste the "Id" field
        And I press the "Retrieve" button
        Then I should see the message "Success"
        And I should see "first" in the "Name" field

    Scenario: Delete a Promotion
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Name" to "first"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "first" in the "Name" field
        When I copy the "Id" field
        And I press the "Delete" button
        Then I should see the message "Promotion has been Deleted!"
        When I press the "Search" button
        Then I should see the message "Success"
        And I should not see "first" in the results
        When I press the "Clear" button
        And I paste the "Id" field
        And I press the "Retrieve" button
        Then I should see the message "was not found"

    Scenario: Invalidate a Promotion
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Name" to "first"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "first" in the "Name" field
        When I press the "Invalidate" button
        Then I should see the message "Success"
        And I should see "False" in the "Validity" dropdown
        When I press the "Clear" button
        And I set the "Name" to "first"
        And I press the "Search" button
        Then I should see "False" in the "Validity" dropdown

    Scenario: Validate a Promotion
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Name" to "third"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "third" in the "Name" field
        When I press the "Invalidate" button
        Then I should see the message "Success"
        And I should see "False" in the "Validity" dropdown
        When I press the "Clear" button
        And I set the "Name" to "third"
        And I press the "Search" button
        Then I should see "False" in the "Validity" dropdown

    Scenario: Extend a Promotion
        When I visit the "Home Page"
        And I press the "Clear" Button
        And I set the "Name" to "third"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "third" in the "Name" field
        When I set the "End Date" to "01-01-2026"
        And I press the "Extend" button
        Then I should see the message "Success"
        When I press the "Clear" button
        And I set the "Name" to "third"
        And I press the "Search" button
        Then I should see the message "Success"
        And I should see "2026-01-01" in the "End Date" field