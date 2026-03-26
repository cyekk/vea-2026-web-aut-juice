import { BasePage } from "../pageObjects/basePage";

export class SavedAddressesPage extends BasePage {
    //---------------------------------------------------------
    static get url() {
        return '/#/address/saved';
    }
    //---------------------------------------------------------
    static get newAddressButton(){
        return cy.get('[aria-label="Add a new address"]');
    }

    static get allAddresses() {
        return cy.get("[role=row]");
    }
    //---------------------------------------------------------
}