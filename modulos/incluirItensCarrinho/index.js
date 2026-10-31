const seletores = {
    // Adição ao carrinho
    botaoAdicionarAoCarrinho: '.add-to-cart',
    modalSucessoAdicao: '#cartModal',
    linkVerCarrinhoModal: '#cartModal u',
    menuCarrinho: 'header a[href="/view_cart"]',

    // Checkout e Pagamento
    botaoProceedToCheckout: '.btn.btn-default.check_out',
    botaoPlaceOrder: 'a[href="/payment"]', // Botão 'Place Order' para ir à tela de pagamento
    
    // Pagamento por Cartão de Crédito
    nomeCartao: '[data-qa="name-on-card"]',
    numeroCartao: '[data-qa="card-number"]',
    cvcCartao: '[data-qa="cvc"]',
    mesExpiracao: '[data-qa="expiry-month"]',
    anoExpiracao: '[data-qa="expiry-year"]',
    botaoPagarEConfirmar: '[data-qa="pay-button"]',

    // Tela de Sucesso da Compra
    mensagemSucessoPedido: '[data-qa="order-placed"]'
};

export const carrinho = {
    adicionarPrimeiroProdutoAoCarrinho() {
        cy.get(seletores.botaoAdicionarAoCarrinho).first().click(); 
        item
        cy.get(seletores.modalSucessoAdicao).should('be.visible'); cy.get(seletores.linkVerCarrinhoModal).click(); 
        cy.get(seletores.linkVerCarrinhoModal).click(); 
    },
    
    irParaCarrinho() {
        cy.get(seletores.menuCarrinho).click();
    },
        prosseguirParaCheckout() {
        cy.get(seletores.botaoProceedToCheckout).click();
    },
    clicarPlaceOrder() {
        cy.get(seletores.botaoPlaceOrder).click();
    },
   
    preencherDadosPagamento(nome, numero, cvc, mes, ano) {
    cy.get(seletores.nomeCartao).type(nome);
    cy.get(seletores.numeroCartao).type(numero); 
    cy.get(seletores.cvcCartao).type(cvc); 
    cy.get(seletores.mesExpiracao).type(mes); 
    cy.get(seletores.anoExpiracao).type(ano); 
    cy.get(seletores.botaoPagarEConfirmar).click(); 
    },
  
    validarPedidoConcluidoComSucesso() {
        cy.get(seletores.mensagemSucessoPedido)
        .should('be.visible')
        .and('contains.text', 'Order Placed'); 
    }
};