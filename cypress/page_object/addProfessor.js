/// <reference types ="cypress" />

class AddProfessor {
    get addProfBtn() {
        return cy.get("a[href='/professors/create']");
    }
    get creatNewProf() {
        return cy.get(".hedaing")
    }
    get nameProf() {
        return cy.get(".form-control").eq(0);
    }
    get lastNameProf() {
        return cy.get(".form-control").eq(1);
    }
    get dropDown() {
        return cy.get(".mb-4");
    }
    get addImgBtn() {
        return cy.get("button[class='btn btn-image btn-primary']");
    }
    get imgInput() {
        return cy.get(".form-control").eq(2)
    }
    get submitBtn() {
        return cy.get("button[class='btn btn-secondary']")
    }

    create(name, lastName, img) {
        this.nameProf.clear().type(name);
        this.lastNameProf.clear().type(lastName);
        this.addImgBtn.click();
        this.imgInput.clear().type(img);
        this.dropDown.select(5);
        this.submitBtn.click()
    }
}

export const addProfessor = new AddProfessor();
