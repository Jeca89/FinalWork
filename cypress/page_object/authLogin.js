/// <reference types ="cypress" />

class AuthLogin {
    get loginPageHeading() {
        return cy.get('.form-login')
    }
    get emailInput() {
        return cy.get("#email");
    }
    get passwordInput() {
        return cy.get('#userPassword');
    }
    get loginBtn() {
        return cy.get('.btn');
    }

    login(email, pass) {
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(pass);
        this.loginBtn.click();
    }
}

export const authLogin = new AuthLogin();
