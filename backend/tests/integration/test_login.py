import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


class TestIntegrationLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/sign_in")

    def tearDown(self):
        self.driver.quit()

    def test_login(self):
        # Simulate login on the system
        email_input = self.driver.find_element(By.ID, "email")
        password_input = self.driver.find_element(By.ID, "password")
        sing_in_button = self.driver.find_element(By.ID, "sign-in")

        email_input.send_keys("admin@admin.com")
        password_input.send_keys("admin")
        sing_in_button.click()

        print("Login successful!")

    def test_login_no_active_account(self):
        # Simulate login on the system
        email_input = self.driver.find_element(By.ID, "email")
        password_input = self.driver.find_element(By.ID, "password")
        sing_in_button = self.driver.find_element(By.ID, "sign-in")

        email_input.send_keys("admin@admin.com")
        password_input.send_keys("noActiveAccount")
        sing_in_button.click()

        # Verify that login fails due to non existing user
        error_message_locator = (By.CSS_SELECTOR, ".MuiAlert-message")
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located(error_message_locator)
        )
        error_message = self.driver.find_element(*error_message_locator).text
        self.assertTrue(
            "No active account found with the given credentials" in error_message
        )

        print("No active account found with the given credentials.")


if __name__ == "__main__":
    unittest.main()
