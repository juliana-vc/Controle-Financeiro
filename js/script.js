const tbody = document.querySelector("tbody")

const descricao = document.querySelector("#descricao")
const valor = document.querySelector("#valor")
const tipo = document.querySelector("#tipo")
const botaoIncluir = document.querySelector("#incluir")

const entrada = document.querySelector(".entrada")
const saida = document.querySelector(".saida")
const total = document.querySelector(".total")

let itens

function adicionar() {
    if (descricao.value === "" || valor.value === "" || tipo === "") {
        return alert("Preencha todos os campos")
    }

    itens.push({
        desc: descricao.value,
        //converte o número para absoluto
        val: Math.abs(valor.value),
        tp: tipo.value
    })

}