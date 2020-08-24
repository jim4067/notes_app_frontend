describe('Note app', function() {
    beforeEach(function () {
        window.cy.visit('http://localhost:3000');
    });

    it("front page can be opnened", function() {
        window.cy.contains("login");
    });

    it("login form can be opnened and user log in", function() {
        window.cy.contains('login').click();
        window.cy.get('#username').type("jim4067");
        window.cy.get('#password').type("pass123");
        window.cy.get('#login-button').click();

        window.cy.contains('Note app, Department of Physical Sciences, University of Nairobi 2020');
    })
});