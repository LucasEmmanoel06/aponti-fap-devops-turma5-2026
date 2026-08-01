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

test("T01 - JSON valido e incluido na lista", () => {
  const pasta = criarPastaTemporaria();

  try {
    escreverArquivo(
      pasta,
      "aluno.json",
      JSON.stringify(
        {
          nome: "Ana Lima",
          github: "analima",
          cidade: "Recife",
          linkedin: "https://linkedin.com/in/analima",
        },
        null,
        2
      )
    );

    const alunos = lerAlunos(pasta);

    assert.equal(alunos.length, 1);
    assert.deepEqual(alunos[0], {
      nome: "Ana Lima",
      github: "analima",
      cidade: "Recife",
      linkedin: "https://linkedin.com/in/analima",
    });
  } finally {
    fs.rmSync(pasta, { recursive: true, force: true });
  }
});