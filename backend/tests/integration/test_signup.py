import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


class TestIntegration(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/sign_up")

    def tearDown(self):
        self.driver.quit()

    def test_signup(self):
        # Simulate signup on the system
        first_name_input = self.driver.find_element(By.ID, "first_name")
        last_name_input = self.driver.find_element(By.ID, "last_name")
        username_input = self.driver.find_element(By.ID, "username")
        email_input = self.driver.find_element(By.ID, "email")
        password_input = self.driver.find_element(By.ID, "password")
        re_password_input = self.driver.find_element(By.ID, "re_password")
        sing_up_button = self.driver.find_element(By.ID, "sign-up")

        first_name_input.send_keys("Lucía")
        last_name_input.send_keys("Blanco")
        username_input.send_keys("uo272830")
        email_input.send_keys("uo272830@uniovi.es")
        password_input.send_keys("^uMfvtWdfQJT6@")
        re_password_input.send_keys("^uMfvtWdfQJT6@")

        sing_up_button.click()

        print("Sign up successful!")

    def test_signup_mismatched_passwords(self):
        # Simulate mismatched passwords while signup
        first_name_input = self.driver.find_element(By.ID, "first_name")
        last_name_input = self.driver.find_element(By.ID, "last_name")
        username_input = self.driver.find_element(By.ID, "username")
        email_input = self.driver.find_element(By.ID, "email")
        password_input = self.driver.find_element(By.ID, "password")
        re_password_input = self.driver.find_element(By.ID, "re_password")
        sing_up_button = self.driver.find_element(By.ID, "sign-up")

        first_name_input.send_keys("Lucía")
        last_name_input.send_keys("Blanco")
        username_input.send_keys("uo000000")
        email_input.send_keys("uo0000000@uniovi.es")
        password_input.send_keys("^uMfvtWdfQJT6@")
        re_password_input.send_keys("differentpassword")

        sing_up_button.click()

        # Verify that signup fails due to mismatched passwords
        error_message_locator = (By.CSS_SELECTOR, ".MuiAlert-message")
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located(error_message_locator)
        )
        error_message = self.driver.find_element(*error_message_locator).text
        self.assertTrue("The two password fields didn't match." in error_message)

        print("The two password fields didn't match.")

    def test_signup_username_already_exists(self):
        # Simulate existing email while signup
        first_name_input = self.driver.find_element(By.ID, "first_name")
        last_name_input = self.driver.find_element(By.ID, "last_name")
        username_input = self.driver.find_element(By.ID, "username")
        email_input = self.driver.find_element(By.ID, "email")
        password_input = self.driver.find_element(By.ID, "password")
        re_password_input = self.driver.find_element(By.ID, "re_password")
        sing_up_button = self.driver.find_element(By.ID, "sign-up")

        first_name_input.send_keys("Lucía")
        last_name_input.send_keys("Blanco")
        username_input.send_keys("admin")
        email_input.send_keys("uo0000000@uniovi.es")
        password_input.send_keys("^uMfvtWdfQJT6@")
        re_password_input.send_keys("^uMfvtWdfQJT6@")

        sing_up_button.click()

        # Verify that signup fails due to mismatched passwords
        error_message_locator = (By.CSS_SELECTOR, ".MuiAlert-message")
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located(error_message_locator)
        )
        error_message = self.driver.find_element(*error_message_locator).text
        self.assertTrue(
            "user account with this username already exists." in error_message
        )

        print("User account with this username already exists.")

    def test_signup_email_already_exists(self):
        # Simulate existing email while signup
        first_name_input = self.driver.find_element(By.ID, "first_name")
        last_name_input = self.driver.find_element(By.ID, "last_name")
        username_input = self.driver.find_element(By.ID, "username")
        email_input = self.driver.find_element(By.ID, "email")
        password_input = self.driver.find_element(By.ID, "password")
        re_password_input = self.driver.find_element(By.ID, "re_password")
        sing_up_button = self.driver.find_element(By.ID, "sign-up")

        first_name_input.send_keys("Lucía")
        last_name_input.send_keys("Blanco")
        username_input.send_keys("uo000000")
        email_input.send_keys("admin@admin.com")
        password_input.send_keys("^uMfvtWdfQJT6@")
        re_password_input.send_keys("^uMfvtWdfQJT6@")

        sing_up_button.click()

        # Verify that signup fails due to mismatched passwords
        error_message_locator = (By.CSS_SELECTOR, ".MuiAlert-message")
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located(error_message_locator)
        )
        error_message = self.driver.find_element(*error_message_locator).text
        self.assertTrue("user account with this email already exists." in error_message)

        print("User account with this email already exists.")

    def test_signup_blank_field(self):
        # Simulate existing email while signup
        first_name_input = self.driver.find_element(By.ID, "first_name")
        last_name_input = self.driver.find_element(By.ID, "last_name")
        username_input = self.driver.find_element(By.ID, "username")
        email_input = self.driver.find_element(By.ID, "email")
        password_input = self.driver.find_element(By.ID, "password")
        re_password_input = self.driver.find_element(By.ID, "re_password")
        sing_up_button = self.driver.find_element(By.ID, "sign-up")

        first_name_input.send_keys("Lucía")
        last_name_input.send_keys("Blanco")
        username_input.send_keys("uo000000")
        email_input.send_keys("")
        password_input.send_keys("^uMfvtWdfQJT6@")
        re_password_input.send_keys("^uMfvtWdfQJT6@")

        sing_up_button.click()

        # Verify that signup fails due to mismatched passwords
        error_message_locator = (By.CSS_SELECTOR, ".MuiAlert-message")
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located(error_message_locator)
        )
        error_message = self.driver.find_element(*error_message_locator).text
        self.assertTrue("This field may not be blank." in error_message)

        print("This field may not be blank.")


if __name__ == "__main__":
    unittest.main()
