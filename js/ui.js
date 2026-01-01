import api from "./api.js"

const listaReceitas = document.querySelector("#listaReceitas")

const ui = {
    async renderizarReceitas(receitasFiltradas = null) {
        listaReceitas.innerHTML = ""

        try {
            let receitas 

            if (receitasFiltradas) {
                receitas = receitasFiltradas
            } else {
                receitas = await api.buscarReceitas()
            }
            
            receitas.forEach((receita) => {this.criarReceita(receita)})

        } catch (error) {
            alert(error)
        }
    },

    async preencherFormulario(id) {
        const idReceita = document.querySelector("#idReceita")
        const titulo = document.querySelector("#titulo")
        const tipo = document.querySelector("#tipo")
        const nota = document.querySelector("#nota")
        const ingredientes = document.querySelector("#ingredientes")
        const preparo = document.querySelector("#preparo")
        const modalTitulo = document.querySelector("#modalTitulo")
        modalTitulo.textContent = "Editar Receita"

        const receita = await api.buscarReceitaPorId(id)

        idReceita.value = receita.id
        titulo.value = receita.titulo
        tipo.value = receita.tipo
        nota.value = receita.nota
        ingredientes.value = receita.ingredientes
        preparo.value = receita.preparo
    },

    preencherModalVerReceita(receita) {
        const titulo = document.querySelector("#visualizarTitulo")
        titulo.textContent = receita.titulo

        const tipo = document.querySelector("#visualizarTipo")
        tipo.textContent = receita.tipo

        const nota = document.querySelector("#visualizarNota")
        nota.innerHTML = ""
        this.criarIconeEstrela(receita, nota)

        const span = document.createElement("span")
        span.classList.add("text-muted", "ms-1", "fw-normal")
        span.id = ("visualizarSpan")
        span.textContent = `(${receita.nota})`
        nota.appendChild(span)

        const ingredientes = document.querySelector("#visualizarIngredientes")
        ingredientes.innerHTML = ""

        const listaIngredientes = receita.ingredientes.split(",")
        listaIngredientes.forEach((ingrediente) => {
            const li = document.createElement("li")
            li.classList.add("list-group-item")
            li.textContent = ingrediente.trim()
            ingredientes.appendChild(li)
        })

        const preparo = document.querySelector("#visualizarPreparo")
        preparo.textContent = receita.preparo


    },

    criarReceita(receita) {
        const li = document.createElement("li")
        li.classList.add("col-md-4", "col-sm-6")

        const divCard = document.createElement("div")
        divCard.classList.add("card", "h-100", "border-0", "shadow-sm", "rounded-4")

        const divCardBody = document.createElement("div")
        divCardBody.classList.add("card-body", "d-flex", "flex-column")

        const divFlex = document.createElement("div")
        divFlex.classList.add("d-flex", "justify-content-between", "align-items-center", "mb-2")

        const spanBadge = document.createElement("span")
        spanBadge.classList.add("badge", "bg-warning", "text-dark", "rounded-pill")
        spanBadge.textContent = receita.tipo


        const btnCoracao = document.createElement("button")
        btnCoracao.classList.add("btn", "border-0", "p-0")

        const iconeCoracao = document.createElement("i")

        if (receita.favorito) {
            iconeCoracao.classList.add("bi", "bi-heart-fill", "text-danger", "fs-5")
        } else {
            iconeCoracao.classList.add("bi", "bi-heart", "text-danger", "fs-5")
        }

        btnCoracao.appendChild(iconeCoracao)

        btnCoracao.addEventListener("click", async () => {

            await api.favoritar(receita.id, !receita.favorito)
            ui.renderizarReceitas()

        })


        divFlex.appendChild(spanBadge)
        divFlex.appendChild(btnCoracao)


        const titulo = document.createElement("h5")
        titulo.classList.add("card-title", "fw-bold", "text-dark")
        titulo.textContent = receita.titulo


        const divEstrelas = document.createElement("div")
        divEstrelas.classList.add("mb-3", "text-warning", "small")

        this.criarIconeEstrela(receita, divEstrelas)

        const notaSpan = document.createElement("span")
        notaSpan.classList.add("text-muted", "ms-1")
        notaSpan.textContent = `(${receita.nota})`
        divEstrelas.appendChild(notaSpan)


        const divBotoes = document.createElement("div")
        divBotoes.classList.add("mt-auto", "d-flex", "gap-2")

        const btnVerReceita = document.createElement("button")
        btnVerReceita.classList.add("btn", "btn-dark", "flex-grow-1", "btn-sm", "btn-ver-receita")
        btnVerReceita.setAttribute("data-bs-toggle", "modal")
        btnVerReceita.setAttribute("data-bs-target", "#modalVisualizar")
        btnVerReceita.textContent = "Ver Receita"

        btnVerReceita.addEventListener("click", () => {
            this.preencherModalVerReceita(receita)
        })


        const btnEditar = document.createElement("button")
        btnEditar.classList.add("btn", "btn-outline-secondary", "rounded-circle", "btn-sm")
        btnEditar.setAttribute("title", "Editar")
        btnEditar.setAttribute("data-bs-toggle", "modal")
        btnEditar.setAttribute("data-bs-target", "#modalReceita")
        const iconeCaneta = document.createElement("i")
        iconeCaneta.classList.add("bi", "bi-pencil-fill")
        btnEditar.appendChild(iconeCaneta)

        btnEditar.addEventListener("click", () => {

            ui.preencherFormulario(receita.id)

        })

        const btnExcluir = document.createElement("button")
        btnExcluir.classList.add("btn", "btn-outline-danger", "rounded-circle", "btn-sm")
        btnExcluir.setAttribute("title", "Excluir")
        const iconeLixeira = document.createElement("i")
        iconeLixeira.classList.add("bi", "bi-trash-fill")
        btnExcluir.appendChild(iconeLixeira)

        btnExcluir.addEventListener("click", async () => {
            const confirmar = confirm(`Tem certeza que quer excluir a receita: ${receita.titulo}?`)

            if (confirmar) {
                try {
                    await api.deletarReceita(receita.id)
                    ui.renderizarReceitas()
                } catch (error) {
                    alert("Erro ao exluir receita")
                }
            }

        })

        divBotoes.appendChild(btnVerReceita)
        divBotoes.appendChild(btnEditar)
        divBotoes.appendChild(btnExcluir)


        divCardBody.appendChild(divFlex)
        divCardBody.appendChild(titulo)
        divCardBody.appendChild(divEstrelas)
        divCardBody.appendChild(divBotoes)

        divCard.appendChild(divCardBody)
        li.appendChild(divCard)

        listaReceitas.appendChild(li)
    },

    criarIconeEstrela(receita, div) {
        for (let i = 1; i <= 5; i++) {
            const iconeEstrela = document.createElement("i")
            iconeEstrela.classList.add("bi")

            if (i <= receita.nota) {
                iconeEstrela.classList.add("bi-star-fill", "text-warning")
            } else {
                iconeEstrela.classList.add("bi-star", "text-warning")
            }

            div.appendChild(iconeEstrela)
        }
    }

}

export default ui