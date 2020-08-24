describe('Note app', function() {
    it("front page can be opnened", function() {
        cy.visit('http://localhost:3000');
        cy.contains("login");
        //cy.contains("Note app, Department of Physical Sciences, University of Nairobi 2020");
    });
});