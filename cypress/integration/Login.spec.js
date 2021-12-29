/// <reference types ="cypress" />

import { authLogin} from '../page_object/authLogin';

describe('login', () => {

    let validEmail = 'jeca_ceca89@hotmail.com';
    let validPassword = 'brankopetra1518'

    before('visit app', () => {
        cy.visit('/')


    });

    it.only('Login with valid credentials', () => {

        cy.intercept({
            method: 'POST',
            url: 'https://gradebook-api.vivifyideas.com/api/login'
        }).as('login');

        authLogin.loginPageHeading.should('be.visible');
        cy.url().should('contains', '/login');

        authLogin.login(validEmail, validPassword);

        cy.wait('@login').then((interception) => {

            expect(interception.response.statusCode).eq(200);
        });
        authLogin.loginPageHeading.should('not.exist');
        cy.url().should('not.contains', "/login");


    });
    it('login backend', () => {
        cy.loginViaBackend();
        cy.visit('/');

    })

});