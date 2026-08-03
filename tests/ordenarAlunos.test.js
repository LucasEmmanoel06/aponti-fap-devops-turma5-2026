const test = require("node:test");
const assert = require("node:assert/strict");

const { ordenarAlunos } = require("../scripts/gerar-readme");

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

test("T05 - Deve ordenar alunos alfabeticamente pelo nome", () => {
	const entrada = [
		{ nome: "Zeca", github: "zeca" },
		{ nome: "Ana", github: "ana" },
		{ nome: "Bruno", github: "bruno" }
	];

	const resultado = ordenarAlunos(entrada);
	const nomesObtidos = resultado.map((aluno) => aluno.nome);
	const nomesEsperados = ["Ana", "Bruno", "Zeca"];

	const aprovado =
		JSON.stringify(nomesObtidos) ===
		JSON.stringify(nomesEsperados);

	mostrarResultado({
		caso: "T05 - Alunos fora de ordem",
		entrada,
		comportamentoEsperado: "retornar a lista ordenada alfabeticamente por nome",
		comportamentoObtido: aprovado
			? "ordenou corretamente os nomes"
			: `retornou a ordem: ${nomesObtidos.join(", ")}`,
		aprovado
	});

	assert.deepEqual(nomesObtidos, nomesEsperados);
});
