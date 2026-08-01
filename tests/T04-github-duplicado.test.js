const assert = require("node:assert/strict");
const test = require("node:test");

const { removerDuplicados } = require("../scripts/gerar-readme.js");

test("T04 - GitHub duplicado e removido", () => {
  const alunos = [
    { nome: "Ana Lima", github: "analima" },
    { nome: "Bruno Costa", github: "ANALIMA" },
    { nome: "Carlos Souza", github: "carlossouza" },
  ];

  const resultado = removerDuplicados(alunos);

  assert.equal(resultado.length, 2);
  assert.deepEqual(resultado.map((aluno) => aluno.github), ["analima", "carlossouza"]);
});