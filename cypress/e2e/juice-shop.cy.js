import { HomePage } from '../pageObjects/HomePage';
import { LoginPage } from '../pageObjects/loginPage';
import { RegistrationPage } from '../pageObjects/registrationPage';

describe('Juice-shop scenarios', () => {
  //===========================================================================
  context('Without auto login', () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it.only('Login', () => {
      
      HomePage.accountButton.click();       // Click Account button
      HomePage.loginButton.click();         // Click Login button
      LoginPage.emailField.type('demo');    // Set email value to "demo"
      LoginPage.passwordField.type('demo'); // Set password value to "demo"
      LoginPage.loginButton.click();        // Click Log in
      HomePage.accountButton.click();       // Click Account button

      // Validate that "demo" account name appears in the menu section
      HomePage.userProfileButton.should('contain.text', 'demo');
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Registration', () => {
      HomePage.accountButton.click();       // Click Account button
      HomePage.loginButton.click();         // Login button
      LoginPage.notYetCustomerLink.click(); // Click "Not yet a customer?"
      
      // Generate random number in JS 
      const randomNumber = Math.floor(Math.random() * 10000);
      // Use that number to genarate unique email address & Save that email address to some variable
      const email = `email_${randomNumber}@inbox.lv`;
      RegistrationPage.emailField.type(email);

      // Fill in password field and repeat password field with same password
      const password = 'password123';
      RegistrationPage.passwordField.type(password);
      RegistrationPage.repeatPasswordField.type(password);

      RegistrationPage.securityQuestionDropdown.click();                                       // Click on Security Question menu
      RegistrationPage.securityQuestionOptions.contains('Name of your favorite pet?').click(); // Select "Name of your favorite pet?"
      RegistrationPage.answerField.type('Pikachu the mouse B)');                               // Fill in answer
      RegistrationPage.registerButton.click();                                                 // Click Register button

      LoginPage.emailField.type(email);                                                        // Set email value to previously created email
      LoginPage.passwordField.type(password);                                                  // Set password value to previously used password value
      LoginPage.loginButton.click();                                                           // Click login button
      HomePage.accountButton.click();                                                          // Click Account button
      
      // Validate that account name (with previously created email address) appears in the menu section
      HomePage.userProfileButton.should('contain.text', email);
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
  });
  //===========================================================================
  context('With auto login', () => {
    beforeEach(() => {
      cy.login('demo', 'demo'); //Izmanto funkc., kas ir "commands.js"
      HomePage.visit();
    });

    it('Search and validate Lemon', () => {
      // Click on search icon
      // Search for Lemon
      // Select a product card - Lemon Juice (500ml)
      // Validate that the card (should) contains "Sour but full of vitamins."
    });

    // Create scenario - Search 500ml and validate Lemon, while having multiple cards
    // Click on search icon
    // Search for 500ml
    // Select a product card - Lemon Juice (500ml)
    // Validate that the card (should) contains "Sour but full of vitamins."

    // Create scenario - Search 500ml and validate cards
    // Click on search icon
    // Search for 500ml
    // Select a product card - Eggfruit Juice (500ml)
    // Validate that the card (should) contains "Now with even more exotic flavour."
    // Close the card
    // Select a product card - Lemon Juice (500ml)
    // Validate that the card (should) contains "Sour but full of vitamins."
    // Close the card
    // Select a product card - Strawberry Juice (500ml)
    // Validate that the card (should) contains "Sweet & tasty!"

    // Create scenario - Read a review
    // Click on search icon
    // Search for King
    // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
    // Click expand reviews button/icon (wait for reviews to appear)
    // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!

    // Create scenario - Add a review
    // Click on search icon
    // Search for Raspberry
    // Select a product card - Raspberry Juice (1000ml)
    // Type in review - "Tastes like metal"
    // Click Submit
    // Click expand reviews button/icon (wait for reviews to appear)
    // Validate review -  "Tastes like metal"

    // Create scenario - Validate product card amount
    // Validate that the default amount of cards is 12
    // Change items per page (at the bottom of page) to 24
    // Validate that the amount of cards is 24
    // Change items per page (at the bottom of page) to 36
    // Validate that the amount of cards is 35

    // Create scenario - Buy Girlie T-shirt
    // Click on search icon
    // Search for Girlie
    // Add to basket "Girlie"
    // Click on "Your Basket" button
    // Create page object - BasketPage
    // Click on "Checkout" button
    // Create page object - SelectAddressPage
    // Select address containing "United Fakedom"
    // Click Continue button
    // Create page object - DeliveryMethodPage
    // Select delivery speed Standard Delivery
    // Click Continue button
    // Create page object - PaymentOptionsPage
    // Select card that ends with "5678"
    // Click Continue button
    // Create page object - OrderSummaryPage
    // Click on "Place your order and pay"
    // Create page object - OrderCompletionPage
    // Validate confirmation - "Thank you for your purchase!"

    // Create scenario - Add address
    // Click on Account
    // Click on Orders & Payment
    // Click on My saved addresses
    // Create page object - SavedAddressesPage
    // Click on Add New Address
    // Create page object - CreateAddressPage
    // Fill in the necessary information
    // Click Submit button
    // Validate that previously added address is visible

    // Create scenario - Add payment option
    // Click on Account
    // Click on Orders & Payment
    // Click on My payment options
    // Create page object - SavedPaymentMethodsPage
    // Click Add new card
    // Fill in Name
    // Fill in Card Number
    // Set expiry month to 7
    // Set expiry year to 2090
    // Click Submit button
    // Validate that the card shows up in the list
  });
  //===========================================================================
});
