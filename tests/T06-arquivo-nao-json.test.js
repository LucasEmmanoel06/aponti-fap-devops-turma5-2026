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

test("T06 - Arquivo que nao e JSON nao e processado", () => {
  const pasta = criarPastaTemporaria();

  try {
    escreverArquivo(
      pasta,
      "aluno.txt",
      "{\n  \"nome\": \"Arquivo ignorado\",\n  \"github\": \"ignorado\"\n}"
    );

    escreverArquivo(
      pasta,
      "aluno.json",
      JSON.stringify({ nome: "Carlos", github: "carlos" }, null, 2)
    );

    const alunos = lerAlunos(pasta);

    assert.equal(alunos.length, 1);
    assert.equal(alunos[0].github, "carlos");
  } finally {
    fs.rmSync(pasta, { recursive: true, force: true });
  }
});