
| ID | Situação | Entrada | Resultado esperado |
| --- | --- | --- | --- |
| T01 | `JSON` válido | Arquivo `JSON` com nome e github válidos | Aluno é incluído na lista e na tabela do `README` |
| T02 | Nome ausente | Arquivo `JSON` sem nome | Aluno não é adicionado à lista |
| T03 | GitHub ausente | Arquivo `JSON` sem github | Aluno não é adicionado à lista |
| T04 | GitHub duplicado | Dois arquivos com o mesmo github | Apenas um aluno com o mesmo github é incluído na lista |
| T05 | Alunos fora de ordem | Lista de alunos não ordenada alfabeticamente | Lista é ordenada pelo nome |
| T06 | Arquivo que não é `JSON` | Arquivo com extensão diferente de `.json` | Arquivo não é processado |
| T07 | `JSON` inválido | Arquivo `JSON` mal formatado | Erro é tratado e o processamento continua |
| T08 | LinkedIn ausente | Aluno sem campo linkedin | A tabela exibe - na coluna LinkedIn |
| T09 | Cidade ausente | Aluno sem campo cidade | A tabela exibe - na coluna Cidade |
| T10 | Atualização do `README` | Execução do script | Tabela e estatísticas são atualizadas corretamente |

