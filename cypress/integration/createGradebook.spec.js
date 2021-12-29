/// <reference types ="cypress" />


import { authLogin} from '../page_object/authLogin';
import { addProfessor } from '../page_object/addProfessor';
import { gradebooksAdd } from '../page_object/addGradebook';

const faker = require("faker");

describe('login', () => {

    let gradebookId = '';
    let validEmail = 'jeca_ceca89@hotmail.com';
    let validPassword = 'brankopetra1518'

    let userData = {
        randomName: faker.name.findName(),
        randomLastName: faker.name.lastName(),
        randomImg: faker.image.imageUrl(200, 200, '.jpg', true)
    }

    before('visit app and login', () => {
        cy.visit('/');
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

    it('create new gradebook', () => {
        gradebooksAdd.addGradBtn.click();
        cy.url().should('contains', '/create')

        cy.intercept({
            method: 'POST',
            url: 'https://gradebook-api.vivifyideas.com/api/gradebook/create'
        }).as('create');

        cy.url().should('contains', '/create')

         gradebooksAdd.gradeBookName.type(userData.randomName);
         gradebooksAdd.profName.select('Jelena Reljic');
         gradebooksAdd.submitBtn.click();

         cy.wait('@create').then((interception) => {
             expect(interception.response.statusCode).eq(201);
             gradebookId = interception.response.body.id
         });

         cy.url().should('not.contains', '/create');
    });
});
