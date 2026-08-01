# Casos de Teste - `gerar-readme.js`

Análise dos comportamentos esperados do script, feita antes da implementação dos testes (Parte 1 da atividade).

## `lerAlunos(pasta)`

**Caso 1 — JSON válido**
Dado um arquivo `.json` com `nome` e `github` preenchidos, o sistema deve reconhecer o arquivo e incluir o aluno na lista retornada.

**Caso 2 — JSON sem `nome`**
Dado um JSON sem a propriedade `nome`, o sistema deve ignorar o registro e não incluí-lo na lista.

**Caso 3 — JSON sem `github`**
Dado um JSON sem a propriedade `github`, o sistema deve ignorar o registro pelo mesmo motivo do Caso 2.

**Caso 4 — Arquivo que não é `.json`**
Dado um arquivo com outra extensão (`.txt`, `.png` etc.), o sistema deve ignorá-lo sem tentar lê-lo.

**Caso 5 — JSON malformado**
Dado um arquivo `.json` com conteúdo inválido (erro de sintaxe), o sistema deve registrar o erro no console e continuar processando os demais arquivos, sem interromper a execução.

**Caso 6 — Pasta `alunos` inexistente**
Dado que a pasta informada não existe, o sistema deve lançar um erro (`"Pasta 'alunos' não encontrada."`).

## `removerDuplicados(alunos)`

**Caso 7 — Usuário do GitHub duplicado**
Dado mais de um registro com o mesmo `github`, o sistema deve manter apenas o primeiro e descartar os demais.

**Caso 8 — Duplicidade não deve depender de maiúsculas/minúsculas**
Dado `github: "UserX"` e `github: "userx"` em registros diferentes, o sistema deve tratá-los como o mesmo usuário e manter apenas um.

## `ordenarAlunos(alunos)`

**Caso 9 — Ordenação alfabética**
Dada uma lista de alunos em ordem arbitrária, o sistema deve retorná-la ordenada por `nome`, respeitando acentuação (localidade `pt-BR`).

**Caso 10 — Não deve alterar a lista original**
Dada uma lista de entrada, a função deve retornar uma nova lista ordenada sem modificar o array original.

## `gerarTabela(alunos)`

**Caso 11 — Lista vazia**
Dada uma lista vazia, o sistema deve gerar apenas o cabeçalho da tabela, sem linhas de alunos.

**Caso 12 — Linha completa**
Dado um aluno com todos os campos preenchidos (`nome`, `github`, `cidade`, `linkedin`), o sistema deve gerar uma linha com avatar, nome, link do GitHub, cidade e link do LinkedIn.

**Caso 13 — Campos opcionais ausentes**
Dado um aluno sem `cidade` e/ou sem `linkedin`, o sistema deve preencher esses campos com `"-"` na tabela.

## `atualizarReadme()` (fluxo completo / integração)

**Caso 14 — Fluxo ponta a ponta**
Dado um conjunto de arquivos de alunos (incluindo um duplicado), o sistema deve: ler todos, remover o duplicado, ordenar por nome, gerar a tabela e substituir o conteúdo entre os marcadores `<!-- TABELA-INICIO -->` e `<!-- TABELA-FIM -->` no README.

**Caso 15 — Atualização das estatísticas**
Após processar os alunos, o sistema deve atualizar o bloco entre `<!-- ESTATISTICAS-INICIO -->` e `<!-- ESTATISTICAS-FIM -->` com o total de alunos cadastrados e a data/hora da atualização.

---

Esses 15 casos foram a base para a suíte de testes implementada em `gerar-readme.test.js` (14 testes automatizados — alguns casos foram combinados quando cobertos pelo mesmo teste, como Casos 2 e 3).
