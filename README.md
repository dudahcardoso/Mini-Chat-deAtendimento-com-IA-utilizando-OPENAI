# Mini-Chat-deAtendimento-com-IA-utilizando-OPENAI

Descrição
---------
Pequeno servidor Node que serve uma página estática e expõe a rota `/answer` que consulta a API do OpenAI e retorna a resposta gerada.

Requisitos
---------
- Node.js (versão moderna com suporte a ESM)
- Uma chave de API OpenAI

Instalação rápida
-----------------

1. Inicialize o projeto e instale dependências:
```sh
npm init -y
npm install openai node-fetch dotenv

2. Configure ESM (se necessário): no package.json adicione "type": "module".

3. Crie o arquivo de ambiente:
cp .env-exemplo .env
# edite .env e coloque sua chave (sem aspas):
# OPENAI_API_KEY=suachaveaqui

Uso
Inicie o servidor: 
node [example.js](http://_vscodecontentref_/0)

Abra no navegador: http://localhost:3001

Clique em "Obter resposta" na interface para requisitar /answer.

--------------------------------------------------------------------
Arquivos importantes

Página e frontend:
index.html — interface do usuário.
script.js — lógica do botão ([btn](script.js)) e atualização da área de resposta ([out](script.js)).
style.css — estilos da página.


Servidor e integração OpenAI:
example.js — servidor HTTP, variável do cliente OpenAI ([openai](example.js)) e instância do servidor ([server](example.js)).


Configuração e meta:
.env-exemplo — exemplo de arquivo de ambiente.
.env — arquivo de ambiente (não versionado).
.gitignore — arquivos ignorados pelo Git.
LICENSE — licença do projeto (GNU GPL v3).
README.md — este arquivo.
Observações de segurança
Nunca compartilhe sua chave em repositórios públicos. Use o arquivo .env e mantenha-o fora do controle de versão.


Licença
Este repositório inclui o arquivo de licença: Collecting workspace information```markdown
// ...existing code...
# Mini-Chat-deAtendimento-com-IA-utilizando-OPENAI

Descrição
---------
Pequeno servidor Node que serve uma página estática e expõe a rota `/answer` que consulta a API do OpenAI e retorna a resposta gerada.

Requisitos
---------
- Node.js (versão moderna com suporte a ESM)
- Uma chave de API OpenAI

Instalação rápida
-----------------
1. Inicialize o projeto e instale dependências:
```sh
npm init -y
npm install openai node-fetch dotenv
```

2. Configure ESM (se necessário): no `package.json` adicione `"type": "module"`.

3. Crie o arquivo de ambiente:
```sh
cp .env-exemplo .env
# edite .env e coloque sua chave (sem aspas):
# OPENAI_API_KEY=suachaveaqui
```

Uso
---
1. Inicie o servidor:
```sh
node example.js
```
2. Abra no navegador: http://localhost:3001  
3. Clique em "Obter resposta" na interface para requisitar `/answer`.

Arquivos importantes
-------------------
- Página e frontend:
  - [index.html](index.html) — interface do usuário.
  - [script.js](script.js) — lógica do botão (`[`btn`](script.js)`) e atualização da área de resposta (`[`out`](script.js)`).
  - [style.css](style.css) — estilos da página.
- Servidor e integração OpenAI:
  - [example.js](example.js) — servidor HTTP, variável do cliente OpenAI (`[`openai`](example.js)`) e instância do servidor (`[`server`](example.js)`).
- Configuração e meta:
  - [.env-exemplo](.env-exemplo) — exemplo de arquivo de ambiente.
  - [.env](.env) — arquivo de ambiente (não versionado).
  - [.gitignore](.gitignore) — arquivos ignorados pelo Git.
  - [LICENSE](LICENSE) — licença do projeto (GNU GPL v3).
  - [README.md](README.md) — este arquivo.

Observações de segurança
-----------------------
- Nunca compartilhe sua chave em repositórios públicos. Use o arquivo [.env](.env) e mantenha-o fora do controle de versão.

Licença
-------
Este repositório inclui o arquivo de licença: [LICENSE](LICENSE).

```
