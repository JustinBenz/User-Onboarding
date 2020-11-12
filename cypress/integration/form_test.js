
describe("Form", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })
    const nameInput = () => cy.get('input[name="name"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passInput = () => cy.get('input[name="pass"]');
    const tosBox = () => cy.get('input[name="tos"]');
    const submitBtn = () => cy.get('#submitBtn')

    it('sanity', () => {
        nameInput().should("have.value", "");
        nameInput().type("test");
        nameInput().should("have.value", "test");
        emailInput().type("test@test.com");
        emailInput().should("have.value", "test@test.com");
        passInput().type("test")
        passInput().should("have.value", "test")
    })


    it('can check the tos box', () => {
        tosBox().should("not.be.checked");
        tosBox().click();
        tosBox().should("be.checked");
    })
    it("can form be submitted", () => {
        cy.contains("test test@test.com test").should("not.exist");
        nameInput().type("test");
        emailInput().type("test@test.com");
        passInput().type("testcuz");
        tosBox().click();
        submitBtn().click();
        cy.contains("test test@test.com test").should("exist");
    })
});

