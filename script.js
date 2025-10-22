// Obtém a referência ao botão da interface cujo id é "btn".
// document.getElementById procura no DOM (Document Object Model) um elemento com esse id.
// Se não existir, btn será null — o código abaixo pressupõe que o elemento esteja presente.
const btn = document.getElementById("btn"); 

// Obtém a referência ao elemento onde a resposta será exibida (div com id "resp").
// Usado para atualizar o texto mostrado ao usuário.
const out = document.getElementById("resp");

// Adiciona um "listener" para o evento de clique no botão.
// Quando o usuário clicar, a função assíncrona passada será executada.
btn.addEventListener("click", async () => {
  // Atualiza a interface imediatamente para informar que a operação está em andamento.
  // Isso melhora a experiência do usuário (feedback visual).
  out.textContent = "Carregando...";

  // Bloco try/catch para capturar erros da operação assíncrona (fetch, parsing, etc.).
  // Como a função é async, podemos usar await dentro do try.
  try {
    // Faz uma requisição HTTP GET para a rota /answer do mesmo servidor.
    // await pausa a execução até que a promessa retornada por fetch seja resolvida.
    const res = await fetch("/answer");

    // Verifica se o servidor respondeu com um status de sucesso (código 2xx).
    // res.ok é true para respostas 200–299. Se não for ok, lançamos um erro com o status.
    if (!res.ok) throw new Error("Erro na requisição: " + res.status);

    // Converte o corpo da resposta para JSON. Também é assíncrono, por isso usamos await.
    // Espera-se que o servidor retorne um objeto JSON com a propriedade "content".
    const data = await res.json();

    // Atualiza a área de saída com o texto retornado pelo servidor.
    // Usa o operador nullish coalescing (??) para exibir "Resposta vazia" caso data.content seja null ou undefined.
    out.textContent = data.content ?? "Resposta vazia";

  } catch (err) {
    // Em caso de qualquer erro (network, parsing, ou o erro que lançamos acima),
    // atualiza a interface exibindo a mensagem de erro para o usuário.
    // err.message contém a descrição do erro.
    out.textContent = "Erro: " + err.message;
  }
});