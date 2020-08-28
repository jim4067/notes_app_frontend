describe('Note app', function() {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3040/api/testing/reset');
        const user = {
            name: "James Mutuku",
            username : "jim4067",
            password : "pass123"
        }
        cy.request('POST', 'http://localhost:3040/api/users', user);
        cy.visit('http://localhost:3000');
    });

    it("front page can be opnened", function() {
        cy.contains("login");
    });

    it("login form can be opnened and user log in", function() {
        cy.contains('login').click();
        cy.get('#username').type("jim4067");
        cy.get('#password').type("pass123");
        cy.get('#login-button').click();

        cy.contains('Note app');
    });

    it("a new note can be added", function() {
        cy.contains('login').click();
        cy.get('#username').type("jim4067");
        cy.get('#password').type("pass123");
        cy.get('#login-button').click();

        cy.contains('new note').click();
        cy.get('input').type("a note created by cypress");
        cy.contains('save').click();
        cy.contains("a note created by cypress");
    });
});

//don't forget to add the cypress plugin