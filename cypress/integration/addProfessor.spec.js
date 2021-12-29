/// <reference types ="cypress" />


import { authLogin} from '../page_object/authLogin';
import { addProfessor } from '../page_object/addProfessor';
const faker = require("faker");

describe('login', () => {

    let profId = '';
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

    it('Add professor', () => {

        cy.intercept({
            method: "POST",
            url: 'https://gradebook-api.vivifyideas.com/api/professors/create'
        }).as('create');


        addProfessor.addProfBtn.click();
        cy.url().should('contain', '/create')

        addProfessor.creatNewProf.should('be.visible')
        addProfessor.nameProf.type(userData.randomName)
        addProfessor.lastNameProf.type(userData.randomLastName)
        addProfessor.dropDown.select(5);
        addProfessor.addImgBtn.click();
        addProfessor.imgInput.type(userData.randomImg)
        addProfessor.submitBtn.click()

        cy.wait('@create').then((interception) => {
            expect(interception.response.statusCode).eq(200);
            profId = interception.response.body.id;
        });

        cy.url().should('not.contains', '/create')

    });


});

