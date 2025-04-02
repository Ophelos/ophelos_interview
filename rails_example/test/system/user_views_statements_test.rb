require "application_system_test_case"

class UserViewsStatementsTest < ApplicationSystemTestCase
  test "user views statements" do
    user = User.create(email_address: "test@example.com", password: "password")
    _statement1 = Affordability::Statement.create(
      user: user,
      statement_period: Date.new(2024, 1, 31),
      transactions_attributes: [
        { category: "income", description: "Salary", amount: 1500_00 },
        { category: "expenditure", description: "Rent", amount: 500_00 },
        { category: "expenditure", description: "Groceries", amount: 200_00 }
      ]
    )
    _statement2 = Affordability::Statement.create(
      user: user,
      statement_period: Date.new(2024, 2, 28),
      transactions_attributes: [
        { category: "income", description: "Salary", amount: 1500_00 },
        { category: "expenditure", description: "Rent", amount: 500_00 },
        { category: "expenditure", description: "Groceries", amount: 300_00 },
        { category: "expenditure", description: "Utilities", amount: 100_00 }
      ]
    )

    visit root_url

    fill_in "Email address", with: "test@example.com"
    fill_in "Password", with: "password"
    click_button "Sign in"

    assert_selector "h1", text: "Your affordability statements"
    assert_selector "table > tbody > tr", count: 2
    assert_selector "table > tbody > tr:nth-child(1) > td:nth-child(1)",
      text: "February 2024"
    assert_selector "table > tbody > tr:nth-child(1) > td:nth-child(2)",
      text: "£600.00"
    assert_selector "table > tbody > tr:nth-child(2) > td:nth-child(1)",
      text: "January 2024"
    assert_selector "table > tbody > tr:nth-child(2) > td:nth-child(2)",
      text: "£800.00"
  end
end
