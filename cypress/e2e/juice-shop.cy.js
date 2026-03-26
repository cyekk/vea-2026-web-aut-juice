import { BasketPage } from '../pageObjects/basketPage.js';
import { CreateAddressPage } from '../pageObjects/createAddressPage.js';
import { DeliveryMethodPage } from '../pageObjects/deliveryMethodPage.js';
import { HomePage } from '../pageObjects/HomePage';
import { LoginPage } from '../pageObjects/loginPage';
import { OrderCompletionPage } from '../pageObjects/orderCompletionPage.js';
import { OrderSummaryPage } from '../pageObjects/orderSummaryPage.js';
import { PaymentOptionsPage } from '../pageObjects/paymentOptionsPage.js';
import { RegistrationPage } from '../pageObjects/registrationPage';
import { SavedAddressesPage } from '../pageObjects/savedAddressesPage.js';
import { SavedPaymentMethodsPage } from '../pageObjects/savedPaymentMethodsPage.js';
import { SelectAddressPage } from '../pageObjects/selectAddressPage.js';

describe('Juice-shop scenarios', () => {
  //===========================================================================
  context('Without auto login', () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Login', () => {
      
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
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Search and validate Lemon', () => {
      HomePage.searchIcon.click();                                   // Click on search icon
      HomePage.searchField.type('Lemon{enter}');                     // Search for Lemon
      HomePage.productNames.contains('Lemon Juice (500ml)').click(); // Select a product card - Lemon Juice (500ml)
     
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.productBoxInfo.should('contain.text','Sour but full of vitamins.');
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Search 500ml and validate Lemon, while having multiple cards', () => {
      HomePage.searchIcon.click();               // Click on search icon
      HomePage.searchField.type('500ml{enter}'); // Search for 500ml
      
      // Select a product card - Lemon Juice (500ml)
      HomePage.productNames.contains('Lemon Juice (500ml)').click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.productBoxInfo.should('contain.text','Sour but full of vitamins.');
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Search 500ml and validate cards', () => {
      HomePage.searchIcon.click();               // Click on search icon
      HomePage.searchField.type('500ml{enter}'); // Search for 500ml
      
      // Select a product card - Eggfruit Juice (500ml)
      HomePage.productNames.contains('Eggfruit Juice (500ml)').click();
      // Validate that the card (should) contains "Now with even more exotic flavour."
      HomePage.productBoxInfo.should('contain.text','Now with even more exotic flavour.');
      // Close the card
      HomePage.closeButton.click();

      // Select a product card - Lemon Juice (500ml)
      HomePage.productNames.contains('Lemon Juice (500ml)').click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.productBoxInfo.should('contain.text','Sour but full of vitamins.');
      // Close the card
      HomePage.closeButton.click();

      // Select a product card - Strawberry Juice (500ml)
      HomePage.productNames.contains('Strawberry Juice (500ml)').click();
      // Validate that the card (should) contains "Sweet & tasty!"
      HomePage.productBoxInfo.should('contain.text','Sweet & tasty!');
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Read a review', () => {
      HomePage.searchIcon.click();               // Click on search icon
      HomePage.searchField.type('King{enter}');  // Search for King
      
      // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
      HomePage.productNames.contains('OWASP Juice Shop "King of the Hill"').click();
      // Click expand reviews button/icon (wait for reviews to appear)
      HomePage.reviewButton.click();
      // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!
      HomePage.reviewText.contains('K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!');
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Add a review', () => {
      HomePage.searchIcon.click();                    // Click on search icon
      HomePage.searchField.type('Raspberry{enter}');  // Search for Raspberry

      // Select a product card - Raspberry Juice (1000ml)
      HomePage.productNames.contains('Raspberry Juice (1000ml)').click();
      // Type in review - "Tastes like metal"
      HomePage.reviewTextBox.click().type('Tastes like metal');
      // Click Submit
      HomePage.submitButton.click();
      // Click expand reviews button/icon (wait for reviews to appear)
      HomePage.reviewButton.click();
      // Validate review -  "Tastes like metal"
      HomePage.reviewText.contains('Tastes like metal');
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Validate product card amount', () => {
      // Validate that the default amount of cards is 12
      HomePage.productNames.should('have.length', 12);

      // Change items per page (at the bottom of page) to 24
      HomePage.itemsPerPageDropdown.click();
      HomePage.itemsPerPageOptions.contains('24').click();
      HomePage.productNames.should('have.length', 24); // Validate

      // Change items per page (at the bottom of page) to 36
      HomePage.itemsPerPageDropdown.click();
      HomePage.itemsPerPageOptions.contains('36').click();
      HomePage.productNames.should('have.length', 36); // Validate
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Buy Girlie T-shirt', () => {
      HomePage.searchIcon.click();                // Click on search icon
      HomePage.searchField.type('Girlie{enter}'); // Search for Girlie
      HomePage.basketButton.click();              // Add to basket "Girlie"
      HomePage.yourBasketButton.click();          // Click on "Your Basket" button

      BasketPage.checkoutButton.click();                                     // Click on "Checkout" button

      SelectAddressPage.addressRows.contains('United Fakedom').click();      // Select address containing "United Fakedom"
      SelectAddressPage.continueButton.click();                              // Click Continue button

      DeliveryMethodPage.deliveryRows.contains('Standard Delivery').click(); // Select delivery speed Standard Delivery
      DeliveryMethodPage.continueButton.click();                             // Click Continue button

      // Select card that ends with "5678"
      PaymentOptionsPage.paymentRows.contains('5678').parent().find(PaymentOptionsPage.radioButton).click();
      PaymentOptionsPage.continueButton.click();                             // Click Continue button

      OrderSummaryPage.checkoutButton.click();                               // Click on "Place your order and pay"

      // Validate confirmation - "Thank you for your purchase!"
      OrderCompletionPage.confirm.should('contain.text', 'Thank you for your purchase!');
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it('Add address', () => {
      HomePage.accountButton.click();                              // Click on Account
      HomePage.accountMenu.contains('Orders & Payment').click();   // Click on Orders & Payment
      HomePage.accountMenu.contains('My saved addresses').click(); // Click on My saved addresses

      SavedAddressesPage.newAddressButton.click();                 // Click on Add New Address

      // Fill in the necessary information
      const testData = {
        country:         'USF',
        name:           'John',
        mobile:     '12345670',
        zip:           '00000',
        address: 'Faketon St.',
        city:      'Fakeville',
        state:     'Florifake',
      }
      CreateAddressPage.addressField('Country').type(testData.country);
      CreateAddressPage.addressField('Name').type(testData.name);
      CreateAddressPage.addressField('Mobile Number').type(testData.mobile);
      CreateAddressPage.addressField('ZIP Code').type(testData.zip);
      CreateAddressPage.addressField('Address').type(testData.address);
      CreateAddressPage.addressField('City').type(testData.city);
      CreateAddressPage.addressField('State').type(testData.state);

      CreateAddressPage.submitButton.click(); // Click Submit button

      // Validate that previously added address is visible
      SavedAddressesPage.allAddresses.contains(testData.name).should("contain.text", testData.name);
      SavedAddressesPage.allAddresses.contains(testData.address).should("contain.text", testData.address + ", " + testData.city + ", " + testData.state + ", " + testData.zip);
      SavedAddressesPage.allAddresses.contains(testData.country).should("contain.text", testData.country);
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
    it.only('Add payment option', () => {
    HomePage.accountButton.click();                              // Click on Account
    HomePage.accountMenu.contains('Orders & Payment').click();   // Click on Orders & Payment
    HomePage.accountMenu.contains('My Payment Options').click(); // Click on My payment options

    // Click Add new card
    SavedPaymentMethodsPage.newCardButton.click();

    const cardData = {
      name:           'John Doe',
      cardnr: '1230001230001230',
    }
    SavedPaymentMethodsPage.paymentField('Name').type(cardData.name);          // Fill in Name
    SavedPaymentMethodsPage.paymentField('Card Number').type(cardData.cardnr); // Fill in Card Number
    SavedPaymentMethodsPage.monthDropdown.select("7");                         // Set expiry month to 7
    SavedPaymentMethodsPage.yearDropdown.select("2090");                       // Set expiry year to 2090
    SavedPaymentMethodsPage.submitButton.click();                              // Click Submit button
  
    // Validate that the card shows up in the list
    SavedPaymentMethodsPage.allPayments.contains(cardData.name).parent().should("contain.text", cardData.name);
    });
    //--------------------------------------------------------------------------------------------------------------------------------------
  });
  //===========================================================================
});
