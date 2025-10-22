import fetch from "node-fetch"; // importa a função fetch do pacote node-fetch para realizar requisições HTTP em Node.js
globalThis.fetch = fetch; // atribui a fetch ao escopo global (globalThis) para que outras partes do código possam chamar fetch(...) como no navegador

import OpenAI from "openai"; // importa a biblioteca/SDK do OpenAI (instanciada abaixo, embora a rota /answer use fetch direto)
import dotenv from "dotenv"; // importa dotenv para carregar variáveis de ambiente de um arquivo .env para process.env
import fs from "fs"; // importa o módulo de sistema de arquivos para ler o index.html
import http from "http"; // importa o módulo HTTP para criar um servidor web simples
import path from "path"; // importa utilitários para manipulação de caminhos de arquivos de forma cross-platform
import { fileURLToPath } from "url"; // importa função para converter import.meta.url (file URL) em um caminho do sistema de arquivos
dotenv.config(); // carrega variáveis de ambiente do arquivo .env para process.env (execução única na inicialização)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}); // instancia o cliente OpenAI com a chave obtida de process.env (SDK). Mesmo que o exemplo use fetch direto mais abaixo, esta linha prepara o SDK caso queira usá-lo.

if (!process.env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY não definido em .env");
  process.exit(1);
} // verifica se a chave da API está definida; se não estiver, registra erro e encerra o processo para evitar chamadas sem credenciais

const __filename = fileURLToPath(import.meta.url); // converte a URL do módulo atual (import.meta.url) para um caminho de arquivo (string) compatível com o SO
const root = path.dirname(__filename); // obtém o diretório que contém este arquivo (pasta do projeto neste contexto)
const indexPath = path.join(root, 'index.html'); // constrói o caminho completo para o arquivo index.html que será servido pelo servidor

const server = http.createServer(async (req, res) => { // cria um servidor HTTP; a função passada trata cada requisição (req) e envia resposta (res)
  try {
    const url = new URL(req.url, `http://${req.headers.host}`); // cria um objeto URL a partir do caminho da requisição e do host, facilitando a análise de pathname, query etc.
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const html = fs.readFileSync(indexPath, 'utf8'); // lê synchronamente o conteúdo de index.html (pequeno arquivo, uso síncrono simplifica o exemplo)
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // define cabeçalho HTTP informando que a resposta é HTML em UTF-8
      res.end(html); // envia o HTML como corpo da resposta e encerra a comunicação para essa requisição
      return; // interrompe a execução do handler para esta requisição, evitando lógica adicional
    }

    // Serve style.css
    if (url.pathname === '/style.css') {
      const cssPath = path.join(root, 'style.css');
      const css = fs.readFileSync(cssPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
      res.end(css);
      return;
    }

    // Serve script.js
    if (url.pathname === '/script.js') {
      const jsPath = path.join(root, 'script.js');
      const js = fs.readFileSync(jsPath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
      res.end(js);
      return;
    }

    if (url.pathname === '/answer') {
      // Usa fetch direto para a API REST do OpenAI (compatível independentemente da versão do SDK)
      const payload = {
        model: "gpt-3.5-turbo", // modelo de chat escolhido para gerar a resposta
        messages: [{ role: "user", content: "Olá, tudo bem?" }], // mensagens enviadas ao modelo (histórico mínimo com uma pergunta do usuário)
        max_tokens: 500 // limite máximo de tokens gerados na resposta para controlar custo/tamanho
      }; // objeto que será enviado no corpo da requisição POST para a API do OpenAI

      const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", // método HTTP POST para criação de completions
        headers: {
          "Content-Type": "application/json", // indica que o corpo é JSON
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` // cabeçalho de autorização com a chave da API em Bearer token
        },
        body: JSON.stringify(payload), // converte o payload para string JSON no corpo da requisição
      }); // realiza a chamada à API do OpenAI e aguarda a resposta

      if (!apiRes.ok) {
        const text = await apiRes.text(); // se o status HTTP não for 2xx, lê a resposta como texto para diagnosticar o problema
        throw new Error(`OpenAI API error ${apiRes.status}: ${text}`); // lança erro com detalhes para ser capturado no bloco catch
      } // tratamento básico de erro HTTP vindo da API externa

      const json = await apiRes.json(); // converte a resposta bem-sucedida para objeto JSON
      const content = json.choices?.[0]?.message?.content ?? ''; // extrai de forma segura o texto gerado (uso de optional chaining e fallback para string vazia)
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); // prepara resposta HTTP com tipo JSON
      res.end(JSON.stringify({ content })); // envia a resposta contendo o conteúdo gerado em formato JSON e encerra
      return; // fim do processamento da rota /answer
    }

    // 404
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); // se nenhuma rota casar, define resposta 404 com texto simples
    res.end('Not found'); // corpo simples indicando recurso não encontrado
  } catch (err) {
    console.error("Server error:", err); // registra o erro no console do servidor para depuração
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' }); // se ocorreu algum erro interno, retorna 500 e JSON com erro
    res.end(JSON.stringify({ error: err.message ?? String(err) })); // envia mensagem de erro para o cliente (útil para depuração em desenvolvimento)
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 3001; // define a porta a partir da variável de ambiente PORT ou usa 3001 como padrão
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // inicia o servidor e loga a URL de acesso quando pronto
});