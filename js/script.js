const tbody = document.querySelector("tbody");

const descricao = document.querySelector("#descricao");
const valor = document.querySelector("#valor");
const tipo = document.querySelector("#tipo");
const botaoIncluir = document.querySelector("#incluir");

const entrada = document.querySelector(".entrada");
const saida = document.querySelector(".saida");
const total = document.querySelector(".total");

let itens;

function adicionar() {
  if (descricao.value === "" || valor.value === "" || tipo === "") {
    return alert("Preencha todos os campos");
  }

  itens.push({
    desc: descricao.value,
    //converte o número para absoluto
    val: Math.abs(valor.value),
    tipo: tipo.value,
  });

  setItens();
  carregarItens();

  descricao.value = "";
  valor.value = "";
}

function apagarItens(index) {
  itens.splice(index, 1);
  setItens();
  carregarItens();
}

function inserirItens(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
        <td>${item.desc}</td>
        <td>${item.val}</td>
        <td class="tipo-coluna">${
          item.tipo === "Entrada"
          ? '<i class="fa-solid fa-angle-up" style="color: #33a324;"></i>'
          : '<i class="fa-solid fa-angle-down" style="color: #af1818;"></i>'
        }</td>
        <td class="coluna-acao">
            <button onclick="apagarItens(${index})"><i class="fa-solid fa-trash-can" style="color: #29303d;"></i></button>
        </td>
    `;
  tbody.appendChild(tr);
}

function carregarItens() {
  itens = getItens();
  tbody.innerHTML = "";
  itens.forEach((item, index) => {
    inserirItens(item, index);
  });

  getTotal();
}

function getTotal() {
  const valorEntrada = itens
    .filter((item) => item.tipo === "Entrada")
    .map((transacao) => Number(transacao.val));

  const valorSaida = itens
    .filter((item) => item.tipo === "Saída")
    .map((transacao) => Number(transacao.val));

  const EntradaTotal = valorEntrada
    .reduce((acumulado, atual) => acumulado + atual, 0)
    .toFixed(2);

  const SaidaTotal = Math.abs(
    valorSaida.reduce((acumulado, atual) => acumulado + atual, 0)
  ).toFixed(2);

  const valorTotal = (EntradaTotal - SaidaTotal).toFixed(2);

  entrada.innerHTML = EntradaTotal;
  saida.innerHTML = SaidaTotal
  total.innerHTML = valorTotal
}

const getItens = () => JSON.parse(localStorage.getItem("db_itens")) ?? []
const setItens = () => 
    localStorage.setItem("db_itens", JSON.stringify(itens)) 
carregarItens()    