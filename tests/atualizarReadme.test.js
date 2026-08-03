const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const { atualizarReadme } = require("../scripts/gerar-readme");

const pastaAlunos = path.join(__dirname, "../alunos");
const readmePath = path.join(__dirname, "../README.md");

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

test("T07 - Deve tratar JSON inválido e continuar o processamento", { concurrency: false }, () => {
	const readmeOriginal = fs.readFileSync(readmePath, "utf8");
	const sufixo = Date.now();
	const arquivoInvalido = path.join(pastaAlunos, `__teste-t07-invalido-${sufixo}.json`);
	const arquivoValido = path.join(pastaAlunos, `__teste-t07-valido-${sufixo}.json`);
	const githubValido = `teste-t07-${sufixo}`;

	const logOriginal = console.log;
	const logs = [];
	console.log = (...args) => {
		logs.push(args.join(" "));
		logOriginal(...args);
	};

	try {
		fs.writeFileSync(arquivoInvalido, "{ nome: 'invalido' ", "utf8");
		fs.writeFileSync(
			arquivoValido,
			JSON.stringify({ nome: "Aluno Valido T07", github: githubValido }),
			"utf8"
		);

		const resultado = atualizarReadme();
		const houveLogDeErro = logs.some((linha) =>
			linha.includes("Erro ao ler") && linha.includes(path.basename(arquivoInvalido))
		);
		const alunoValidoFoiProcessado = resultado.alunos.some(
			(aluno) => aluno.github === githubValido
		);

		const aprovado = houveLogDeErro && alunoValidoFoiProcessado;

		mostrarResultado({
			caso: "T07 - JSON inválido",
			entrada: {
				arquivoInvalido: path.basename(arquivoInvalido),
				arquivoValido: path.basename(arquivoValido)
			},
			comportamentoEsperado: "registrar erro do JSON inválido e continuar processando os demais arquivos",
			comportamentoObtido: aprovado
				? "tratou o erro e processou o JSON válido"
				: "não evidenciou corretamente o tratamento e continuidade",
			aprovado
		});

		assert.equal(houveLogDeErro, true);
		assert.equal(alunoValidoFoiProcessado, true);
	} finally {
		console.log = logOriginal;
		fs.rmSync(arquivoInvalido, { force: true });
		fs.rmSync(arquivoValido, { force: true });
		fs.writeFileSync(readmePath, readmeOriginal, "utf8");
	}
});

test("T10 - Deve atualizar tabela e estatísticas do README", { concurrency: false }, () => {
	const readmeOriginal = fs.readFileSync(readmePath, "utf8");

	try {
		const resultado = atualizarReadme();
		const readmeAtualizado = fs.readFileSync(readmePath, "utf8");

		const totalEsperado = `Total de alunos cadastrados: ${resultado.alunos.length}`;
		const ultimaAtualizacaoEsperada = `Última atualização: ${resultado.dataAtualizacao}`;
		const contemMarcadoresTabela =
			readmeAtualizado.includes("<!-- TABELA-INICIO -->") &&
			readmeAtualizado.includes("<!-- TABELA-FIM -->");
		const contemMarcadoresEstatisticas =
			readmeAtualizado.includes("<!-- ESTATISTICAS-INICIO -->") &&
			readmeAtualizado.includes("<!-- ESTATISTICAS-FIM -->");

		const aprovado =
			readmeAtualizado.includes(totalEsperado) &&
			readmeAtualizado.includes(ultimaAtualizacaoEsperada) &&
			contemMarcadoresTabela &&
			contemMarcadoresEstatisticas;

		mostrarResultado({
			caso: "T10 - Atualização do README",
			entrada: "execução do script atualizarReadme()",
			comportamentoEsperado: "atualizar tabela e estatísticas com os dados atuais",
			comportamentoObtido: aprovado
				? "README atualizado com total e data de atualização corretos"
				: "README não refletiu corretamente as estatísticas esperadas",
			aprovado
		});

		assert.equal(readmeAtualizado.includes(totalEsperado), true);
		assert.equal(readmeAtualizado.includes(ultimaAtualizacaoEsperada), true);
		assert.equal(contemMarcadoresTabela, true);
		assert.equal(contemMarcadoresEstatisticas, true);
	} finally {
		fs.writeFileSync(readmePath, readmeOriginal, "utf8");
	}
});
