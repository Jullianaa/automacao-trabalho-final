const seletores = {
    rodape: '#footer',
    tituloSubscription: '.single-widget h2',
    campoEmailSubscription: '#susbscribe_email',
    botaoSubscription: '#subscribe',
    mensagemSucesso: '.alert-success'
};

export const rodape = {
    rolarAteRodape() {
        cy.get(seletores.rodape).scrollIntoView(); // Faz a rolagem suave até o elemento
        cy.get(seletores.tituloSubscription)
        .should('be.visible')
        .and('contain', 'Subscription');
    },
    
    preencherInscricaoNewsletter(email) {
        cy.get(seletores.campoEmailSubscription).type(email);
        cy.get(seletores.botaoSubscription).click();
    },

    validarMensagemInscricaoSucesso() {
        cy.get(seletores.mensagemSucesso)
        .should('be.visible')
        .and('contain', 'You have been successfully subscribed!');
    }
};