import { BasePage } from "../pageObjects/basePage";

export class CreateAddressPage extends BasePage {
    //---------------------------------------------------------
    static get url() {
        return '/#/address/create';
    }
    //---------------------------------------------------------
    static addressField(name){
        return cy.contains('mat-form-field', name).find('input, textarea');
    }

    static get submitButton(){
        return cy.get('#submitButton');
    }
    //---------------------------------------------------------
}