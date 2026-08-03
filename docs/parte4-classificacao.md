# Parte 4 - Classificação dos Testes

Nesta etapa foi realizada a classificação dos testes automatizados do projeto em Smoke, Sanidade e Regressão. A análise foi feita considerando o objetivo de cada teste, o comportamento validado e a finalidade da verificação.

| Teste                            | Classificação | Justificativa                                                                                                                   |
| -------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **T01 - JSON válido**            | **Smoke**     | Verifica rapidamente se a leitura de um JSON válido funciona, indicando que a funcionalidade básica do script está operacional. |
| **T02 - JSON sem nome**          | **Sanidade**  | Valida especificamente a regra de ignorar registros sem o campo `nome`.                                                         |
| **T03 - JSON sem GitHub**        | **Sanidade**  | Verifica especificamente a validação do campo obrigatório `github`.                                                             |
| **T04 - GitHub duplicado**       | **Sanidade**  | Testa especificamente a funcionalidade de remoção de duplicidades.                                                              |
| **T05 - Ordenação dos alunos**   | **Sanidade**  | Valida especificamente a funcionalidade de ordenação alfabética.                                                                |
| **T06 - Arquivo que não é JSON** | **Regressão** | Garante que arquivos inválidos continuem sendo ignorados após alterações no código.                                             |
| **T07 - JSON inválido**          | **Regressão** | Verifica que o tratamento de erro e a continuidade do processamento continuam funcionando.                                      |
| **T08 - LinkedIn ausente**       | **Regressão** | Garante que a geração da tabela continue tratando corretamente campos opcionais.                                                |
| **T09 - Cidade ausente**         | **Regressão** | Garante que a tabela continue sendo gerada corretamente quando a cidade estiver ausente.                                        |
| **T10 - Atualização do README**  | **Smoke**     | Verifica que o fluxo principal do script consegue atualizar o README, conforme o exemplo fornecido no enunciado.                |
