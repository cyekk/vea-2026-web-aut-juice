import { BasePage } from "../pageObjects/basePage";

export class SavedPaymentMethodsPage extends BasePage {
    //---------------------------------------------------------
    static get url() {
        return '/#/saved-payment-methods';
    }
    //---------------------------------------------------------
    static paymentField(name){
        return cy.contains('mat-form-field', name).find('input, textarea');
    }

    static get newCardButton() {
        return cy.get("mat-expansion-panel-header");
    }

    static get monthDropdown(){
        return cy.get('select#mat-input-4');
    }

    static get yearDropdown(){
        return cy.get('select#mat-input-5');
    }    

    static get submitButton(){
        return cy.get('#submitButton');
    }

    static get allPayments() {
        return cy.get("[role='row']");
    }
    //---------------------------------------------------------
}