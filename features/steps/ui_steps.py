from behave import when, then
from selenium.webdriver.common.by import By

@when('I visit the "{page_name}"')
def step_impl(context, page_name):
    """ Open the home page """
    context.driver.get(context.BASE_URL)

@then('I should see "{text}" in the title')
def step_impl(context, text):
    """ Check the title of the web page """
    assert text in context.driver.title, f'"{text}" not in page title: {context.driver.title}'

@then('I should not see "404 Not Found"')
def step_impl(context):
    """ Make sure there is no 404 error on the page """
    body = context.driver.find_element(By.TAG_NAME, 'body')
    assert "404 Not Found" not in body.text, "Found 404 error on the page!"