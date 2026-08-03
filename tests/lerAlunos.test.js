const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { lerAlunos } = require("../scripts/gerar-readme");

// Cria uma pasta temporária para não mexer nos arquivos reais do projeto.
function criarPastaTeste() {
  return fs.mkdtempSync(
    path.join(os.tmpdir(), "teste-alunos-")
  );
}

// Apaga a pasta temporária depois que o teste termina.
function apagarPastaTeste(pasta) {
  fs.rmSync(pasta, {
    recursive: true,
    force: true
  });
}

// Mostra no terminal uma explicação simples do teste.
function mostrarResultado({
  caso,
  entrada,
  comportamentoEsperado,
  comportamentoObtido,
  aprovado
}) {
  console.log("\n----------------------------------------");
  console.log(`Caso: ${caso}`);
  console.log("Entrada usada:", entrada);
  console.log(`O sistema deveria: ${comportamentoEsperado}`);
  console.log(`O sistema fez: ${comportamentoObtido}`);
  console.log(`Status: ${aprovado ? "APROVADO" : "REPROVADO"}`);
  console.log("----------------------------------------");
}

test("T01 - Deve incluir um aluno com JSON válido", () => {
  const pasta = criarPastaTeste();

  try {
    const entrada = {
      nome: "Ana",
      github: "ana123"
    };

    fs.writeFileSync(
      path.join(pasta, "ana.json"),
      JSON.stringify(entrada)
    );

    const resultado = lerAlunos(pasta);
    const aprovado = resultado.length === 1;

    mostrarResultado({
      caso: "T01 - JSON válido",
      entrada,
      comportamentoEsperado: "incluir o aluno na lista",
      comportamentoObtido: aprovado
        ? "incluiu o aluno na lista"
        : "não incluiu o aluno corretamente",
      aprovado
    });

    assert.equal(resultado.length, 1);
    assert.equal(resultado[0].nome, "Ana");
    assert.equal(resultado[0].github, "ana123");
  } finally {
    apagarPastaTeste(pasta);
  }
});

test("T02 - Deve ignorar um JSON sem nome", () => {
  const pasta = criarPastaTeste();

  try {
    const entrada = {
      github: "ana123"
    };

    fs.writeFileSync(
      path.join(pasta, "sem-nome.json"),
      JSON.stringify(entrada)
    );

    const resultado = lerAlunos(pasta);
    const aprovado = resultado.length === 0;

    mostrarResultado({
      caso: "T02 - JSON sem nome",
      entrada,
      comportamentoEsperado:
        'ignorar o registro porque o campo "nome" está ausente',
      comportamentoObtido: aprovado
        ? "ignorou o registro"
        : "incluiu um registro sem nome",
      aprovado
    });

    assert.equal(resultado.length, 0);
  } finally {
    apagarPastaTeste(pasta);
  }
});

test("T03 - Deve ignorar um JSON sem GitHub", () => {
  const pasta = criarPastaTeste();

  try {
    const entrada = {
      nome: "Ana"
    };

    fs.writeFileSync(
      path.join(pasta, "sem-github.json"),
      JSON.stringify(entrada)
    );

    const resultado = lerAlunos(pasta);
    const aprovado = resultado.length === 0;

    mostrarResultado({
      caso: "T03 - JSON sem GitHub",
      entrada,
      comportamentoEsperado:
        'ignorar o registro porque o campo "github" está ausente',
      comportamentoObtido: aprovado
        ? "ignorou o registro"
        : "incluiu um registro sem GitHub",
      aprovado
    });

    assert.equal(resultado.length, 0);
  } finally {
    apagarPastaTeste(pasta);
  }
});

test("T06 - Deve ignorar um arquivo que não seja JSON", () => {
  const pasta = criarPastaTeste();

  try {
    const entrada = {
      arquivo: "anotacoes.txt",
      conteudo: "Arquivo usado apenas para o teste."
    };

    fs.writeFileSync(
      path.join(pasta, entrada.arquivo),
      entrada.conteudo
    );

    const resultado = lerAlunos(pasta);
    const aprovado = resultado.length === 0;

    mostrarResultado({
      caso: "T06 - Arquivo que não é JSON",
      entrada,
      comportamentoEsperado:
        "ignorar o arquivo porque sua extensão não é .json",
      comportamentoObtido: aprovado
        ? "ignorou o arquivo"
        : "processou um arquivo que não era JSON",
      aprovado
    });

    assert.equal(resultado.length, 0);
  } finally {
    apagarPastaTeste(pasta);
  }
});