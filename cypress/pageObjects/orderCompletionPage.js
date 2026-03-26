import { BasePage } from "../pageObjects/basePage";

export class OrderCompletionPage extends BasePage {
    //---------------------------------------------------------
    static get url() {
        return "/#/order-completion";
    }
    //---------------------------------------------------------
    static get confirm(){
        return cy.get('.confirmation');
    }
    //---------------------------------------------------------
}