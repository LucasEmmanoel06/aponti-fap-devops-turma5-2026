const assert = require("node:assert/strict");
const test = require("node:test");

const { ordenarAlunos } = require("../scripts/gerar-readme.js");

test("T05 - Lista ordenada alfabeticamente pelo nome", () => {
  const alunos = [
    { nome: "Zoe", github: "zoe" },
    { nome: "Ana", github: "ana" },
    { nome: "Bruno", github: "bruno" },
  ];

  const resultado = ordenarAlunos(alunos);

  assert.deepEqual(resultado.map((aluno) => aluno.nome), ["Ana", "Bruno", "Zoe"]);
});