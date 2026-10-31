    const seletores = {
        // Formulário de Login
        emailLogin: '[data-qa="login-email"]',
        senhaLogin: '[data-qa="login-password"]',
        botaoLogin: '[data-qa="login-button"]',
        mensagemErro: '.login-form form p',
        
        usuarioLogado: 'a:contains("Logged in as")',
        botaoLogout: 'a[href="/logout"]',
        botaoExcluirConta: 'a[href="/delete_account"]',
        
        mensagemContaExcluida: '[data-qa="account-deleted"]',
        botaoContinuarExclusao: '[data-qa="continue-button"]'
    };
    export const login = {
        preencherLogin(email, senha) {
        cy.get(seletores.emailLogin).type(email);
        cy.get(seletores.senhaLogin).type(senha);
        cy.get(seletores.botaoLogin).click();
    },
    // Valida se o nome do usuário logado está correto
    validarUsuarioLogado(nomeUsuario) {
    cy.get(seletores.usuarioLogado)
    .should('be.visible')
    .and('contain', nomeUsuario);
    },
    
    validarMensagemErroLogin(mensagemEsperada) {
    cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('contain', mensagemEsperada);
    },

    efetuarLogout() {
        cy.get(seletores.botaoLogout).click();
    },

    excluirConta() {
        cy.get(seletores.botaoExcluirConta).click(); 
        cy.get(seletores.mensagemContaExcluida)
        .should('be.visible')
        .and('contains.text', 'Account Deleted'); 
        cy.get(seletores.botaoContinuarExclusao).click(); 
    }
};