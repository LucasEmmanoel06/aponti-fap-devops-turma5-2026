const test = require("node:test");
const assert = require("node:assert/strict");

const { gerarTabela } = require("../scripts/gerar-readme");

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

test("T08 - Deve exibir '-' na coluna LinkedIn quando linkedin estiver ausente", () => {
	const entrada = [
		{
			nome: "Ana",
			github: "ana123",
			cidade: "Recife"
		}
	];

	const tabela = gerarTabela(entrada);
	const comportamentoEsperado = "mostrar '-' na coluna LinkedIn";
	const linhaEsperada = "| <img src=\"https://github.com/ana123.png\" width=\"50\"> | Ana | [@ana123](https://github.com/ana123) | Recife | - |";
	const aprovado = tabela.includes(linhaEsperada);

	mostrarResultado({
		caso: "T08 - LinkedIn ausente",
		entrada,
		comportamentoEsperado,
		comportamentoObtido: aprovado
			? "mostrou '-' na coluna LinkedIn"
			: "não exibiu '-' na coluna LinkedIn",
		aprovado
	});

	assert.equal(aprovado, true);
});

test("T09 - Deve exibir '-' na coluna Cidade quando cidade estiver ausente", () => {
	const entrada = [
		{
			nome: "Bruno",
			github: "bruno456",
			linkedin: "https://linkedin.com/in/bruno"
		}
	];

	const tabela = gerarTabela(entrada);
	const comportamentoEsperado = "mostrar '-' na coluna Cidade";
	const linhaEsperada = "| <img src=\"https://github.com/bruno456.png\" width=\"50\"> | Bruno | [@bruno456](https://github.com/bruno456) | - | [Perfil](https://linkedin.com/in/bruno) |";
	const aprovado = tabela.includes(linhaEsperada);

	mostrarResultado({
		caso: "T09 - Cidade ausente",
		entrada,
		comportamentoEsperado,
		comportamentoObtido: aprovado
			? "mostrou '-' na coluna Cidade"
			: "não exibiu '-' na coluna Cidade",
		aprovado
	});

	assert.equal(aprovado, true);
});
