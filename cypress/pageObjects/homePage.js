import { BasePage } from "../pageObjects/basePage";

export class HomePage extends BasePage {
  static get url() {
    return "/#/";
  }

  static get dismissButton() {
    return cy.get("[aria-label='Close Welcome Banner']");
  }

  static get meWantItButton() {
    return cy.get("[aria-label='dismiss cookie message']");
  }
  //---------------------------------------------------------
  static get accountButton(){
    return cy.get('#navbarAccount');
  }

  static get loginButton(){
    return cy.get('#navbarLoginButton');
  }

  static get userProfileButton() {
    return cy.get("button[aria-label='Go to user profile']").find("span");
  }
  //---------------------------------------------------------
  static get searchIcon(){
    return cy.get('#searchQuery');
  }

  static get searchField(){
    return cy.get('#searchQuery input');
  }

  static get productNames(){
    return cy.get('[class="mat-grid-tile ng-star-inserted"]').find('[class="info-box"]');
  }

  static get productBoxInfo(){
    return cy.get('mat-dialog-content .details-row');
  }
  //---------------------------------------------------------
  static get closeButton(){
    return cy.get('.close-dialog');
  }
  //---------------------------------------------------------
  static get reviewButton() {
    return cy.get('.mat-expansion-panel');
  }

  static get reviewText() {
    return cy.get('.mat-expansion-panel-content');
  }

  static get reviewTextBox() {
    return cy.get("[aria-label='Text field to review a product']");
  }

  static get submitButton(){
    return cy.get('#submitButton');
  }
  //---------------------------------------------------------
  static get itemsPerPageDropdown() {
    return cy.get('.mat-mdc-paginator-touch-target');
  }

  static get itemsPerPageOptions() {
    return cy.get("[role='option']");
  }
  //---------------------------------------------------------
  static get basketButton() {
    return cy.get("[aria-label = 'Add to Basket']");
  }

  static get yourBasketButton() {
    return cy.get("[aria-label = 'Show the shopping cart']");
  }
  //---------------------------------------------------------
  static get accountMenu(){
    return cy.get('button[mat-menu-item]');
  }

  //---------------------------------------------------------
}
