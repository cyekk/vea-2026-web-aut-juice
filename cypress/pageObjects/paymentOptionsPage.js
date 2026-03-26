import { BasePage } from "../pageObjects/basePage";

export class PaymentOptionsPage extends BasePage {
    //---------------------------------------------------------
    static get url() {
        return "/#/payment/shop";
    }
    //---------------------------------------------------------
    static get paymentRows(){
        return cy.get('mat-table mat-row');
    }

    static get radioButton(){
        return 'mat-radio-button';
    }

    static get continueButton(){
        return cy.get("[aria-label='Proceed to review']");
    }
    //---------------------------------------------------------
}