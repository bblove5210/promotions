from behave import when, then
import requests


@when('I send a GET request to the "Home Page"')
def step_send_get_request(context):
    context.response =  requests.get(context.BASE_URL)


@then('the response status code should be {status_code:d}')
def step_check_status_code(context, status_code):
    actual_status = context.response.status_code
    assert actual_status == status_code, f"Expected status code {status_code}, but got {actual_status}"


@then('the JSON response should have "name" equal to "{expected_name}"')
def step_check_json_name(context, expected_name):
    json_data = context.response.json()
    actual_name = json_data.get("name")
    assert actual_name == expected_name, f"Expected name '{expected_name}', but got '{actual_name}'"


@then('the JSON response should have "version" equal to "{expected_version}"')
def step_check_json_version(context, expected_version):
    """
    Assert that the JSON response contains the specified 'version' value.
    """
    json_data = context.response.json()
    actual_version = json_data.get("version")
    assert actual_version == expected_version, f"Expected version '{expected_version}', but got '{actual_version}'"
