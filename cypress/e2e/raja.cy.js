describe('Site raja', () => {
  it('se connecter ', () => {
    cy.visit('https://stg2-fr.rajapack.xyz/')
    cy.get('#dropdown-account').click()
    cy.wait(5000);
    cy.get('#dropdown-block').should('be.visible');
    cy.get('#UserLoginDropdown').type('toto33@gmail.com');
    cy.get('#UserPasswordDropdown').type('TotoDupond33!');
    cy.get('[data-ajax="https://stg2-fr.rajapack.xyz/INTERSHOP/web/WFS/RAJA-FR-Site/fr_FR/-/EUR/ViewUserLogin-ProcessLogin?DisplayDropdown=true"]').click();
    // cliquer sur commande
    cy.wait(5000);
    cy.get('[href="https://stg2-fr.rajapack.xyz/quick-order.html"]').click();
    cy.wait(5000);
    cy.url().should("include", "/quick-order.html");
    // renseigner la ref
    cy.get('#addProductRef').type('Cas01');
    cy.get('#checkoutListSearch ').should('be.visible');
    cy.get('#CAS01').click({force:true});
    // ajouter le produit dans le panier
    cy.get('#open-cart-confirmation').click();
    cy.get('[data-cy="add-to-cart-modal"]').should('be.visible');
    //voir mon panier
    cy.get("[href='https://stg2-fr.rajapack.xyz/INTERSHOP/web/WFS/RAJA-FR-Site/fr_FR/-/EUR/ViewCart-View']").click();
    //Verifier lurl a changé
    cy.url().should("includes", "/INTERSHOP/");
    //valider le panier
    cy.get('[data-cy="go-to-fastcheckout"]').click({force:true});
    //Valider et payer la commande
    cy.get('[data-cy="fastcheckout-checkbox-sameaddress"]').should('be.visible').check();
    //Choix du payement
    cy.get('#cgv-mobile').check()
    cy.get('[data-cy="recap-mobile-fastcheckout-next"]').click({force:true});
    //commande terminé
    cy.wait(5000);
    cy.get('#checkout-confirmation-success').should('have.text', 'Félicitations, votre commande est confirmée !');
  }); 
});