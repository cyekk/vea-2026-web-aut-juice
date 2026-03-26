import { BasePage } from "./basePage";

export class RegistrationPage extends BasePage{
    //---------------------------------------------------------
    static get emailField(){
        return cy.get('input#emailControl');
    }

    static get passwordField(){
        return cy.get('#passwordControl');
    }

    static get repeatPasswordField(){
        return cy.get('#repeatPasswordControl');
    }

    static get securityQuestionDropdown(){
        return cy.get("mat-select[name='securityQuestion']");
    }

    static get securityQuestionOptions(){
        return cy.get("[role='option']");
    }

    static get answerField(){
        return cy.get('#securityAnswerControl');
    }

    static get registerButton(){
        return cy.get('#registerButton');
    }
    //---------------------------------------------------------
}