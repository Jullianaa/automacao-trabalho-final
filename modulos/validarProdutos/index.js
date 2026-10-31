const seletores = {
    menuProdutos: 'a[href="/products"]',
    listaProdutos: '.features_items',
    botaoViewProductPrimeiroItem: '.features_items .col-sm-4 a[href^="/product_details"]',

    painelDetalhesProduto: '.product-information',

    campoPesquisa: '#search_product',
    botaoPesquisa: '#submit_search',
    tituloPesquisa: '.title.text-center'
};
export const produtos = {
    navegarParaProdutos() {
        cy.get(seletores.menuProdutos).click();
    },

    validarListaProdutosVisivel() {
        cy.get(seletores.listaProdutos).should('be.visible');
    },

    visualizarDetalhesPrimeiroProduto() {
        cy.get(seletores.botaoViewProductPrimeiroItem).first().click();
    },

    validarInformacoesDetalhadaProduto() {
        cy.get(seletores.painelDetalhesProduto).should('be.visible').within(() => {
            cy.get('h2').should('be.visible'); 
            cy.get('p').should('contain', 'Category'); 
            cy.get('span span').should('be.visible'); 
            cy.get('p').should('contain', 'Availability'); 
            cy.get('p').should('contain', 'Condition'); 
            cy.get('p').should('contain', 'Brand'); 
        });
    },

    pesquisarProduto(nomeProduto) {
    cy.get(seletores.campoPesquisa).type(nomeProduto);
    cy.get(seletores.botaoPesquisa).click();
    },
  
    validarResultadoPesquisa(termoBuscado) {
        cy.get(seletores.tituloPesquisa)
        .should('be.visible')
        .and('contains.text', 'Searched Products'); // Valida o título do resultado
        cy.get(seletores.listaProdutos)
        .should('be.visible')
        .and('contain', termoBuscado); // Garante que o item buscado aparece no resultado
    }
};