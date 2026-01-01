import ui from "./ui.js";
import api from "./api.js";

const formularioReceita = document.querySelector("#formReceita")
const inputBusca = document.querySelector("#inputBusca")
const filtroFavoritos = document.querySelector("#filtroFavoritos")

const btnCancelar = document.querySelector("#btnCancelar")

ui.renderizarReceitas()

formularioReceita.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    const id = document.querySelector("#idReceita").value
    const titulo = document.querySelector("#titulo").value
    const tipo = document.querySelector("#tipo").value
    const nota = document.querySelector("#nota").value
    const ingredientes = document.querySelector("#ingredientes").value
    const preparo = document.querySelector("#preparo").value

    if (id) {
        await api.alterarReceita({ id, titulo, tipo, nota, ingredientes, preparo })
    } else {
        await api.cadastrarReceita({ titulo, tipo, nota, ingredientes, preparo })
    }

    await ui.renderizarReceitas()
    limparFormulario()
})

inputBusca.addEventListener("input", async () => {
    const termo = inputBusca.value
    const receitasFiltradas = await api.filtrarPorTermo(termo)
    await ui.renderizarReceitas(receitasFiltradas)
})

filtroFavoritos.addEventListener("click", async () => {
    inputBusca.value = ""

    if (filtroFavoritos.checked) {
        const favoritos = await api.buscarFavoritos()
        ui.renderizarReceitas(favoritos)
    } else {
        ui.renderizarReceitas()
    }
})

btnCancelar.addEventListener("click", () => {
    limparFormulario()
})

function limparFormulario() {
    formularioReceita.reset()
    document.querySelector("#idReceita").value = ""
    document.querySelector("#modalTitulo").textContent = "Nova Receita"
}