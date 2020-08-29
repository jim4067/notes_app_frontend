describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3040/api/testing/reset');
        const user = {
            name: "James Mutuku",
            username: "jim4067",
            password: "pass123"
        }
        cy.request('POST', 'http://localhost:3040/api/users', user);
        cy.visit('http://localhost:3000');
    });

    /*
     *repeated in the test below 
     
    it("login form can be opnened and user log in", function() {
        cy.contains('login').click();
        cy.get('#username').type("jim4067");
        cy.get('#password').type("pass123");
        cy.get('#login-button').click();

        cy.contains('Note app');
    });
    */

    describe("when logged in ", function () {

        beforeEach(function () {
            cy.login({ username: "jim4067", password: "pass123" })
        });

        it("a new note can be added and its importance changed", function () {
            cy.contains('new note').click();
            cy.get('input').type("created by cypress", { force: true });
            cy.contains('save').click();
            cy.contains("created by cypress")
                .contains('make important')
                .click();

            cy.contains("created by cypress")
                .contains('make not important')
        });


        describe("and a note exits", function () {
            beforeEach(function () {
                cy.createNote({
                    content: "created from a custom command",
                    important: true
                });
            });
        });

        describe("and several functions exist" , function (){
            beforeEach(function () {
                cy.createNote({content: "the first note", important : true});
                cy.createNote({content: "the second note", important: false});
                cy.createNote({content: "the third note", imprtant: false});
            });

            it.only("one of those can be made importnat", function (){
                cy.contains('the second note')
                  .contains('make important')
                  .click();

                cy.contains("the second note")
                   .contains("make not important");  
            });

        });
    
        /*slow net. test timeout before this is tested
        it("and its importance can be changed", function () {
            cy.contains('created by cypress')
                .contains('make important')
                .click();
 
            cy.contains("created by cypress")
                .contains('make not important');
        });
        

        describe("password failure ", function () {
            //Testing only one test using .only 
            it("login fails with wrong password", function () {
                cy.contains("login").click();
                cy.get('#username').type("jim47");
                cy.get('#password').type("this is wrong");
                cy.get('#login-button').click();

                cy.get('.error')
                    .should('contain', "wrong credentials")
                    .and('have.css', 'color', 'rgb(255, 0, 0)')
                    .and('have.css', 'border-style', 'solid')

                cy.get('html').should('not.contain', "James Mutuku logged in");
            });
        });
        */

    });

    

});
//don't forget to add the cypress plugin