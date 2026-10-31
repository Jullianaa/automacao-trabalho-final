const seletores = {
    nomeCadastro: '[data-qa="signup-name"]',
    emailCadastro: '[data-qa="signup-email"]',
    botaoSignup: '[data-qa="signup-button"]',
    generoMasculino: '#id_gender1',
    senha: '[data-qa="password"]',
    diaNascimento: '[data-qa="days"]',
    mesNascimento: '[data-qa="months"]',
    anoNascimento: '[data-qa="years"]',
    primeiroNome: '[data-qa="first_name"]',
    sobrenome: '[data-qa="last_name"]',
    endereco: '[data-qa="address"]',
    pais: '[data-qa="country"]',
    estado: '[data-qa="state"]',
    cidade: '[data-qa="city"]',
    zipcode: '[data-qa="zipcode"]',
    celular: '[data-qa="mobile_number"]',
    botaoCriarConta: '[data-qa="create-account"]',
    mensagemContaCriada: '[data-qa="account-created"]',
    botaoContinuar: '[data-qa="continue-button"]'
};

export const cadastro = {

    iniciarCadastro(nome, email) {
    cy.get(seletores.nomeCadastro).type(nome);
    cy.get(seletores.emailCadastro).type(email);
    cy.get(seletores.botaoSignup).click();
    },
    // Preenche todos os campos obrigatórios do formulário extenso de cadastro
    preencherFormularioCompleto(dados) {
        cy.get(seletores.generoMasculino).check(); 
        cy.get(seletores.senha).type(dados.senha); 
        cy.get(seletores.diaNascimento).select(dados.dia); 
        cy.get(seletores.mesNascimento).select(dados.mes); 
        cy.get(seletores.anoNascimento).select(dados.ano); 
        cy.get(seletores.primeiroNome).type(dados.nome); 
        cy.get(seletores.sobrenome).type(dados.sobrenome); 
        cy.get(seletores.endereco).type(dados.endereco); 
        cy.get(seletores.pais).select(dados.pais); 
        cy.get(seletores.estado).type(dados.estado); 
        cy.get(seletores.cidade).type(dados.cidade); 
        cy.get(seletores.zipcode).type(dados.zipcode); 
        cy.get(seletores.celular).type(dados.celular); 
        cy.get(seletores.botaoCriarConta).click(); 
    },
    validarContaCriada() {
        cy.get(seletores.mensagemContaCriada)
        .should('be.visible')
        .and('contains.text', 'Account Created');  
        cy.get(seletores.botaoContinuar).click();
    }
};