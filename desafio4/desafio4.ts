 // Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

var apiKey = '3f301be7381a03ad8d352314dcc3ec1d';
let requestToken:string;
let username:string;
let password:string;
let sessionId:string;
let listId:string = '7101979';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');

//definindo tipo para request session_id
type sessionIdRequest = {
  session_id:string
}

//definindo tipo para request token
type requestTokenResponse = {
  request_token:string
}

//definindo tipo de parametro da clase htppclient
type clientParameter = {
  url:string,
  method:string,
  body?: Document | XMLHttpRequestBodyInit | null | undefined | {
    username?:string,
    password?:string,
    request_token?:string,
    name?:string,
    description?:string,
    language?:string,
    media_id?:any
  }
}

//definindo tipo para query de filme
type movieQuery = {
  page:number,
  results:{
    adult:boolean,
    backdrop_path: string,
    genre_ids:number[],
    id:number,
    original_language:string,
    original_title:string,
    overview:string,
    popularity:number,
    poster_path:string,
    release_date:string,
    title:string,
    video:boolean,
    vote_average:number,
    vote_count:number
  }[],
  total_pages:number,
  total_results:number
}

if(loginButton){
  loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
  })
}

if(searchButton){
  searchButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) {
      lista.outerHTML = "";
    }
    let queryElement = document.getElementById('search') as HTMLInputElement;
    let query:string = ""
    if(queryElement){
      query = queryElement.value;
    }
    let listaDeFilmes:movieQuery = await procurarFilme(query);
    let ul = document.createElement('ul');
    ul.id = "lista"
    for (const item of listaDeFilmes.results) {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(item.original_title))
      ul.appendChild(li)
    }
    console.log(listaDeFilmes);
    if(searchContainer){
      searchContainer.appendChild(ul);
    }
  })
  
}

function preencherSenha() {
  let passwordElement = document.getElementById('senha') as HTMLInputElement
  if(passwordElement){
    password = passwordElement.value
  }
  validateLoginButton();
}

function preencherLogin() {
  let usernameElement = document.getElementById('login') as HTMLInputElement
  if(usernameElement){
    username = usernameElement.value
  }
  validateLoginButton();
}

function preencherApi() {
  let apiKeyElement = document.getElementById('api-key') as HTMLInputElement
  if(apiKeyElement){
    apiKey = apiKeyElement.value;
  }
  validateLoginButton();
}

function validateLoginButton() {
  if(loginButton){
    if (password && username && apiKey) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }
}

class HttpClient {
  static async get(parameter:clientParameter) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(parameter.method, parameter.url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (parameter.body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        parameter.body = JSON.stringify(parameter.body);
      }
      request.send(parameter.body);
    })
  }

  static async getRequestToken(parameter:clientParameter):Promise<requestTokenResponse> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(parameter.method, parameter.url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (parameter.body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        parameter.body = JSON.stringify(parameter.body);
      }
      request.send(parameter.body);
    })
  }
  
  static async getMovie(parameter:clientParameter):Promise<movieQuery> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(parameter.method, parameter.url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (parameter.body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        parameter.body = JSON.stringify(parameter.body);
      }
      request.send(parameter.body);
    })
  }
  
  static async getSessionId(parameter:clientParameter):Promise<sessionIdRequest> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(parameter.method, parameter.url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (parameter.body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        parameter.body = JSON.stringify(parameter.body);
      }
      request.send(parameter.body);
    })
  }
}

async function procurarFilme(query:string):Promise<movieQuery> {
  query = encodeURI(query)
  console.log(query)
  let result:movieQuery = await HttpClient.getMovie({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function adicionarFilme(filmeId:string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken () {
  let result:requestTokenResponse = await HttpClient.getRequestToken({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  })
}

async function criarSessao() {
  let result:sessionIdRequest = await HttpClient.getSessionId({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  })
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista:string, descricao:string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  })
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId:string, listaId:string) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
}