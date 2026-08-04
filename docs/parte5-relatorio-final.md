
# Saída do Terminal

## Resumo da execução
- Total de testes executados: 10
- Testes aprovados: 10
- Testes com falha: 0

## Detalhes dos testes

### T01 - JSON válido
- Entrada usada: `{ nome: 'Ana', github: 'ana123' }`
- Esperado: incluir o aluno na lista
- Resultado observado: o aluno foi incluído corretamente
- Status: Aprovado
- Tempo: 4.7953ms

### T02 - JSON sem nome
- Entrada usada: `{ github: 'ana123' }`
- Esperado: ignorar o registro porque o campo `nome` está ausente
- Resultado observado: o registro foi ignorado corretamente
- Status: Aprovado
- Tempo: 2.5467ms

### T03 - JSON sem GitHub
- Entrada usada: `{ nome: 'Ana' }`
- Esperado: ignorar o registro porque o campo `github` está ausente
- Resultado observado: o registro foi ignorado corretamente
- Status: Aprovado
- Tempo: 1.9379ms

### T04 - GitHub duplicado
- Entrada usada: `[{ nome: 'Ana', github: 'ana123' }, { nome: 'Ana Silva', github: 'ana123' }, { nome: 'Bruno', github: 'bruno456' }]`
- Esperado: manter apenas um registro para `ana123` e preservar `bruno456`
- Resultado observado: o registro duplicado foi removido e o aluno restante foi mantido
- Status: Aprovado
- Tempo: 2.2448ms

### T05 - Alunos fora de ordem
- Entrada usada: `[{ nome: 'Zeca', github: 'zeca' }, { nome: 'Ana', github: 'ana' }, { nome: 'Bruno', github: 'bruno' }]`
- Esperado: retornar a lista ordenada alfabeticamente por nome
- Resultado observado: a lista foi ordenada corretamente
- Status: Aprovado
- Tempo: 14.571ms

### T06 - Arquivo que não é JSON
- Entrada usada: `arquivo: 'anotacoes.txt'`
- Esperado: ignorar o arquivo porque a extensão não é `.json`
- Resultado observado: o arquivo foi ignorado corretamente
- Status: Aprovado
- Tempo: 1.8214ms

### T07 - JSON inválido
- Entrada usada: `{"arquivoInvalido": "__teste-t07-invalido-1785806201272.json", "arquivoValido": "__teste-t07-valido-1785806201272.json"}`
- Esperado: registrar o erro do JSON inválido e continuar processando os demais arquivos
- Resultado observado: o erro foi tratado corretamente e o JSON válido foi processado
- Status: Aprovado
- Tempo: 258.4998ms

### T08 - LinkedIn ausente
- Entrada usada: `[{ nome: 'Ana', github: 'ana123', cidade: 'Recife' }]`
- Esperado: exibir `-` na coluna LinkedIn
- Resultado observado: a coluna LinkedIn foi exibida como `-`
- Status: Aprovado
- Tempo: 2.2115ms

### T09 - Cidade ausente
- Entrada usada: `[{ nome: 'Bruno', github: 'bruno456', linkedin: 'https://linkedin.com/in/bruno' }]`
- Esperado: exibir `-` na coluna Cidade
- Resultado observado: a coluna Cidade foi exibida como `-`
- Status: Aprovado
- Tempo: 0.6589ms

### T10 - Atualização do README
- Entrada usada: execução do script `atualizarReadme()`
- Esperado: atualizar a tabela e as estatísticas com os dados atuais
- Resultado observado: o README foi atualizado com o total e a data de atualização corretos
- Status: Aprovado
- Tempo: 9.5577ms

## Observações
- A execução do script de atualização do README foi concluída com sucesso.
- Todos os testes foram aprovados sem falhas.
- A saida do terminal foi ordenada nesse documento e padronizada