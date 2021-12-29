/// <reference types ="cypress" />

class GradebooksAdd {
    get addGradBtn(){
        return cy.get(":nth-child(5) > .nav-link");
    }
    get gradeBookName(){
        return cy.get("input[class='input-filed form-control']");
    }
    get profName(){
        return cy.get("select[class='mb-4 custom-select']");
    }
    get submitBtn(){
        return cy.get("button[class='btn btn-submit btn-primary']");
    }
}

export const gradebooksAdd = new GradebooksAdd();
