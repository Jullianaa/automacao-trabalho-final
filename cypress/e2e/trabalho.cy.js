/// <reference types="cypress" />

import { cadastro } from '../modules/cadastro';
import { login } from '../modules/login';
import { produtos } from '../modules/produtos';
import { carrinho } from '../modules/carrinho';
import { rodape } from '../modules/rodape';

describe('Trabalho PGATS - automação com cypress', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Caso 1: Cadastrar usuário com sucesso e excluir conta', () => {
        const emailDinamico = `aluna_pgats_${Date.now()}@teste.com`;
        cy.get('a[href="/login"]').click();

        cadastro.iniciarCadastro('Julliana Couto', emailDinamico);
        cadastro.preencherFormularioCompleto({
            senha: 'Senhapgatsjuju',
            dia: '11',
            mes: 'February',
            ano: '1994',
            nome: 'Julliana',
            sobrenome: 'Couto',
            endereco: 'Rua da qa, 11',
            pais: 'Brasil',
            estado: 'Distrito Federal',
            cidade: 'Gama', 
            zipcode: '11001',
            celular: '61999999999'
        });

        cadastro.validarContaCriada();
        login.excluirConta();
    });


    it('Caso 2: Login de usuário com e-mail e senha corretos', () => {
        const emailDinamico = `aluna_login_${Date.now()}@teste.com`;
        cy.get('a[href="/login"]').click();
        cadastro.iniciarCadastro('Julliana pgats', emailDinamico);
        cadastro.preencherFormularioCompleto({
        senha: 'Senhapgatsjuju',
        dia: '08', mes: 'May', ano: '1970',
        nome: 'Julliana', sobrenome: 'Login',
        endereco: 'Av Testes, 200', pais: 'Franca',
        estado: 'ilha da Franca', cidade: 'Paris',
        zipcode: '99999', celular: '11111111111'
        });
        cadastro.validarContaCriada();

        login.efetuarLogout();
        cy.get('a[href="/login"]').click();
        login.preencherLogin(emailDinamico, 'Senhapgatsjuju');
        login.validarUsuarioLogado('Julliana Login');
        login.excluirConta();
    });

    it('Caso 3: Tentar login com e-mail e senha incorretos', () => {
        cy.get('a[href="/login"]').click();
        login.preencherLogin('email_invalido_pgats@naoexiste.com', 'SenhaIncorreta!');
        login.validarMensagemErroLogin('Your email or password is incorrect!');
    });

    it('Caso 4: Logout do usuário com sucesso', () => {
        const emailDinamico = `aluna_logout_${Date.now()}@teste.com`;
        cy.get('a[href="/login"]').click();
        cadastro.iniciarCadastro('Julliana Logout', emailDinamico);
        cadastro.preencherFormularioCompleto({
            senha: 'Senhapgatsjuju',
            dia: '1', mes: 'January', ano: '1980',
            nome: 'Julliana', sobrenome: 'Logout',
            endereco: 'quadra saida, 1', pais: 'Mexico',
            estado: 'mex', cidade: 'Cidad del Mexico',
            zipcode: '72400', celular: '71777777777'
        });
        cadastro.validarContaCriada();
        login.efetuarLogout();
        cy.url().should('include', '/login');
    });

    it('Caso 5: Tentar cadastrar usuário com e-mail já existente', () => {
        const emailExistente = `aluna_existente_${Date.now()}@teste.com`;
        cy.get('a[href="/login"]').click();
        cadastro.iniciarCadastro('Usuario Existente', emailExistente);
        cadastro.preencherFormularioCompleto({
            senha: 'Senhapgatsjuju',
            dia: '1', mes: 'January', ano: '2000',
            nome: 'Usuario', sobrenome: 'Existente',
            endereco: 'Rua do consumo, 10', pais: 'United States',
            estado: 'CA', cidade: 'Los Angeles',
            zipcode: '90001', celular: '11999999999'
        });

        cadastro.validarContaCriada();
        login.efetuarLogout();
        // 2. Tenta iniciar o cadastro novamente com o mesmo e-mail já registrado
        cy.get('a[href="/login"]').click();
        cadastro.iniciarCadastro('Usuario Existente', emailExistente);

        // Valida se a mensagem de alerta é exibida no formulário
        cy.get('.signup-form form p')
        .should('be.visible')
        .and('contain', 'Email Address already exist!');

        // 3. Efetua o login com a conta criada para poder realizar a exclusão ao final
        login.preencherLogin(emailExistente, 'Senhapgatsjuju');
        login.excluirConta();
    });

    it('Caso 8: Verificar todos os produtos e página de detalhes do produto', () => {
        produtos.navegarParaProdutos();
        produtos.validarListaProdutosVisivel();
        produtos.visualizarDetalhesPrimeiroProduto();
        produtos.validarInformacoesDetalhadaProduto();
    });

    it('Caso 9: Pesquisar produtos por nome', () => {
        produtos.navegarParaProdutos();
        produtos.pesquisarProduto('Dress');
        produtos.validarResultadoPesquisa('Dress');
    });

    it('Caso 10: Verificar inscrição na página inicial (Subscription)', () => {
        rodape.rolarAteRodape();
        rodape.preencherInscricaoNewsletter('aluna_subscription@teste.com');
        rodape.validarMensagemInscricaoSucesso();
    });

    it('Caso 15: Fazer pedido: Cadastrar antes do Checkout', () => {
        // E-mail exclusivo para o fluxo de compra do caso 15
        const emailDinamico = `aluna_checkout_${Date.now()}@teste.com`;
        // 1. Efetua o cadastro prévio do usuário completo
        cy.get('a[href="/login"]').click();
        cadastro.iniciarCadastro('Julliana checkout', emailDinamico);
        cadastro.preencherFormularioCompleto({
            senha: 'Senhapgatsjuju',
            dia: '18', mes: 'March', ano: '1994',
            nome: 'Julliana', sobrenome: 'Checkout',
            endereco: 'Rua do Checkout, 500', pais: 'Brasil',
            estado: 'SP', cidade: 'Morumbi',
            zipcode: '10001', celular: '61999999999'
        });

        cadastro.validarContaCriada();
        produtos.navegarParaProdutos();
        carrinho.adicionarPrimeiroProdutoAoCarrinho();
        carrinho.prosseguirParaCheckout();
        carrinho.clicarPlaceOrder();
        carrinho.preencherDadosPagamento('Julliana Checkout', '61999999999', '333', '11','2028');
        carrinho.validarPedidoConcluidoComSucesso();
        login.excluirConta();
    });

    it('Caso 16: Fazer pedido: Fazer login antes do Checkout', () => {
        // E-mail exclusivo para o fluxo de compra 
        const emailDinamico = `aluna_login_checkout_${Date.now()}@teste.com`;

        cy.get('a[href="/login"]').click();
        cadastro.iniciarCadastro('Julliana LoginCheckout', emailDinamico);
        cadastro.preencherFormularioCompleto({
            senha: 'Senhapgatsjuju',
            dia: '10', mes: 'June', ano: '1991',
            nome: 'Julliana', sobrenome: 'LoginCheckout',
            endereco: 'Rua Comercio, 800', pais: 'Brasil',
            estado: 'BR', cidade: 'Belo horizonte',
            zipcode: '77101', celular: '117777777777'
        });

        cadastro.validarContaCriada();
        login.efetuarLogout();
        cy.get('a[href="/login"]').click();
        login.preencherLogin(emailDinamico, 'Senhapgatsjuju');
        produtos.navegarParaProdutos();
        carrinho.adicionarPrimeiroProdutoAoCarrinho();
        carrinho.prosseguirParaCheckout();
        carrinho.clicarPlaceOrder();
        carrinho.preencherDadosPagamento('Julliana LoginCheckout', '4111111111111111', '311', '12','2028');
        carrinho.validarPedidoConcluidoComSucesso();
        login.excluirConta();
    });
});