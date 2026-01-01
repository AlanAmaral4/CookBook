const URL_BASE = "http://localhost:3000"

const api = {
    async buscarReceitas() {
        try {
            const resposta = await axios.get(`${URL_BASE}/receitas`)
            return resposta.data
        } catch (error) {
            alert("Erro ao carregar a lista de receitas")
        }
    },

    async buscarReceitaPorId(id) {
        try {
            const resposta = await axios.get(`${URL_BASE}/receitas/${id}`)
            return resposta.data
        } catch (error) {
            alert("Erro ao carregar receita")
        }
    },

    async cadastrarReceita(receita) {
        try {
            await axios.post(`${URL_BASE}/receitas`, receita)
        } catch (error) {
            alert("Erro ao cadastrar receita")
        }
    },

    async alterarReceita(receita) {
        try {
            await axios.put(`${URL_BASE}/receitas/${receita.id}`, receita)
        } catch (error) {
            alert("Erro ao alterar receita")
        }
    },

    async deletarReceita(id) {
        try {
            await axios.delete(`${URL_BASE}/receitas/${id}`)
        } catch (error) {
            alert("Erro ao deletar receita")
        }
    },

    async filtrarPorTermo(termo) {
        try {
            const receitas = await this.buscarReceitas()
            const termoMaiuscolo = termo.toUpperCase()
            const receitasFiltradas = receitas.filter((receita) => {
                const titulo = receita.titulo.toUpperCase().includes(termoMaiuscolo)
                const tipo = receita.tipo.toUpperCase().includes(termoMaiuscolo)
                return titulo || tipo
            })
            return receitasFiltradas
        } catch (error) {
            alert("Erro ao filtrar receitas")
        }
    },

    async favoritar(id, favorito) {
        try {
            await axios.patch(`${URL_BASE}/receitas/${id}`, { favorito })
        } catch (error) {
            alert("Erro ao favoritar receita")
        }
    },

    async buscarFavoritos() {
        try {
            const receitas = await this.buscarReceitas()
            const receitasFiltradas = receitas.filter((receita) => {
                return receita.favorito === true
            })
            return receitasFiltradas
        } catch (error) {
            alert("Erro ao buscar favoritos")
        }
    }

}

export default api