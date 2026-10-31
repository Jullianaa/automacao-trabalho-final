/// <reference types="cypress" />

/*
Tipos de asserts
    - existencia (o elemnto existe?)
    - visibilidade (elemento está visível)
    - conteúdo (texto esperado)
    - Estado (checked, disabled, selected)
    - Navegação (url ou path esperado)
    - Estrutura (quantidade esperada ex: busca em listas)
*/

describe('Automation Exercise', () => {
    // Cadastro
    it('Cadastrar um novo usuário com sucesso', () => {
        cy.visit('https://www.automationexercise.com')
        cy.get('a[href*=login').click()
        cy.assert(data-qa="signup-email")
    });

}); 