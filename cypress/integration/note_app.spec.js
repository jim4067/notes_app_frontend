describe('Note app', function() {
    beforeEach(function () {
        window.cy.visit('http://localhost:3000');
    });

    it("front page can be opnened", function() {
        window.cy.contains("login");
        //cy.contains("Note app, Department of Physical Sciences, University of Nairobi 2020");
    });

    it("login form can be opnened", function() {
        window.cy.contains('login').click();
        window.cy.get('input:first').type("jim4067");
        window.cy.get('input:last').type("pass123");
    })
});