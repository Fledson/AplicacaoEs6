// importando a API
import api from './api'

// Classe geral da aplicacao
class App {
    constructor() {
        // vetor para armazenar os repositorios
        this.repositories = []

        // referenciando itens do html
        this.formElement = document.getElementById('repo-form')
        this.inputElement = document.querySelector('input[name=repository]')
        this.listElement = document.getElementById('repo-list')

        // chamando a função de registro
        this.registroEventos();
    }

    // criando a função para registrar os eventos que ocorrem ao  apertar o botão
    registroEventos() {
        //adicionando o evento onsubmint, passando como parametro a variavel event(ela carrega os dados do form)
        //essa função anomima chama a função addRepositories passando o form novamente como parametro
        this.formElement.onsubmit = event => this.addRepositories(event)
    }

    // Criando mensagem de carregamento
    addLoading(loading = true) {

        if (loading === true) {
            // se for um loading

            //criando um span
            let loadingEl = document.createElement('span')
                // adicionando o texto do span 
            loadingEl.appendChild(document.createTextNode('Carregando...'))

            //criando um id para o elemento, assim posso remover ele da tela depois
            loadingEl.setAttribute('id', 'loading')

            // adicionando o elemento ao meu formulario
            this.formElement.appendChild(loadingEl)

        } else {
            // se não for um loading ele remove o item da tela
            document.getElementById('loading').remove()
        }
    }

    // Função que adiciona no array os dados dos repositorios (é uma array de objetos)
    async addRepositories(event) {
        // Aqui o event que foi passado recebe sua funcionalidade o preventDefault()
        // esse evento não deixa o form recarregar a pagina enviando o get ou o post
        event.preventDefault()

        // pegando o valor informando dentro do input
        const repoInput = this.inputElement.value

        // verificando se o tamanho do texto é 0, ou seja, verificando se o campo não ta vazio
        if (repoInput.length === 0) {
            return; // o return para a função, então caso ele entre na condição a função para
        }

        // chamando a mensagem de carregamento, não preciso passar paramentro pois ele ja ta defidido como true
        this.addLoading()

        try {
            // fazendo requisição a api
            const response = await api.get(`/repos/${repoInput}`)

            // usando desestruturação para buscar os valores
            const { name, description, html_url, owner: { avatar_url } } = response.data

            //Atualização do array, adicionando um novo objeto (Repositorio) dentro do array usando o push()
            this.repositories.push({
                //aqui será usando o conceito de Object Short Syntax
                // sera deixado apenas o nome das variaveis pois as variaveis tem o mesmo nome
                name,
                description,
                avatar_url,
                html_url,
            })

            // Limpa o input depos da pesquisa
            this.inputElement.value = ''

            // chama a função render para preencher a lista com o repositorio
            this.render()
        } catch (err) {
            alert('Repositorio não existe')
        }

        // retirando a mensagem de carregamento, preciso passar paramentro pois ele ja ta defidido como true, assim tenho que mandar o false
        this.addLoading(false)
    }

    // função para criar e preencher minha lista com os itens dos repositorio passado
    render() {
        //Apagar itens da minha lista
        this.listElement.innerHTML = ''

        //percorrendo o array com forEach
        this.repositories.forEach(repo => {
            // criando o elemento da imagem
            let imgEl = document.createElement('img')
                // Adicionando o src passando o link do avatar
            imgEl.setAttribute('src', repo.avatar_url)

            //criando o strong do texto
            let titleEl = document.createElement('strong')
                //anexando o o nome no meu elemento strong que foi criado
            titleEl.appendChild(document.createTextNode(repo.name))

            //Criando o elemento do paragrafo 
            let descriptionEl = document.createElement('p')
                //Adcionando a descrição do array ao elemento p
            descriptionEl.appendChild(document.createTextNode(repo.description))

            // criando o elemento link
            let linkEl = document.createElement('a')
                // configurando o atributo do meu link para que ele abra em uma nova pagina
            linkEl.setAttribute('target', '_blank')
                // colocando o link no meu elemento
            linkEl.setAttribute('href', repo.html_url)
                //criando o texto do link
            linkEl.appendChild(document.createTextNode('Acessar'))

            //Criando o item da lista
            let listItemEl = document.createElement('li')

            //adicionando os elementos ao item da lista
            listItemEl.appendChild(imgEl)
            listItemEl.appendChild(titleEl)
            listItemEl.appendChild(descriptionEl)
            listItemEl.appendChild(linkEl)

            //Adicionanaod o item da lista a lista
            this.listElement.appendChild(listItemEl)

        })
    }
}

// chamando a classe sem precisar armazenar em variavel
new App();