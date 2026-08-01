const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const { lerAlunos } = require("../scripts/gerar-readme.js");

function criarPastaTemporaria() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "aponti-testes-"));
}

function escreverArquivo(dir, nome, conteudo) {
  fs.writeFileSync(path.join(dir, nome), conteudo, "utf8");
}

test("T07 - JSON invalido e tratado sem parar o processamento", () => {
  const pasta = criarPastaTemporaria();
  const logs = [];
  const logOriginal = console.log;

  try {
    escreverArquivo(pasta, "quebrado.json", '{ "nome": "Sem fechamento" ');
    escreverArquivo(
      pasta,
      "valido.json",
      JSON.stringify({ nome: "Daniel", github: "daniel" }, null, 2)
    );

    console.log = (...args) => {
      logs.push(args.join(" "));
    };

    const alunos = lerAlunos(pasta);

    assert.equal(alunos.length, 1);
    assert.equal(alunos[0].nome, "Daniel");
    assert.ok(logs.some((linha) => linha.includes("quebrado.json")));
  } finally {
    console.log = logOriginal;
    fs.rmSync(pasta, { recursive: true, force: true });
  }
});