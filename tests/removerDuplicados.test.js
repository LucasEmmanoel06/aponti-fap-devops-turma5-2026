const test = require("node:test");
const assert = require("node:assert/strict");

const {
  removerDuplicados
} = require("../scripts/gerar-readme");

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

test("T04 - Deve remover um GitHub duplicado", () => {
  const entrada = [
    {
      nome: "Ana",
      github: "ana123"
    },
    {
      nome: "Ana Silva",
      github: "ana123"
    },
    {
      nome: "Bruno",
      github: "bruno456"
    }
  ];

  const resultado = removerDuplicados(entrada);

  const githubsObtidos = resultado.map(
    (aluno) => aluno.github
  );

  const githubsEsperados = [
    "ana123",
    "bruno456"
  ];

  const aprovado =
    JSON.stringify(githubsObtidos) ===
    JSON.stringify(githubsEsperados);

  mostrarResultado({
    caso: "T04 - GitHub duplicado",
    entrada,
    comportamentoEsperado:
      "manter apenas um registro para ana123 e preservar bruno456",
    comportamentoObtido: aprovado
      ? "removeu o registro duplicado e manteve dois alunos"
      : `retornou os GitHubs: ${githubsObtidos.join(", ")}`,
    aprovado
  });

  assert.deepEqual(
    githubsObtidos,
    githubsEsperados
  );
});