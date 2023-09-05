# API de Catálogo de Pokémon

Esta é uma API para catalogar Pokémon com uso de tecnologias de autenticação de usuário. Ela permite que você adicione, atualize, liste e exclua Pokémon em sua coleção, com cada usuário tendo seu próprio catálogo de Pokémon.

## Funcionalidade

A API oferece as seguintes funcionalidades:

- Cadastro de usuário com senha criptografada.
- Login de usuário com geração de token de autenticação.
- Cadastro de Pokémon com nome, habilidades e apelido (opcional).
- Atualização do apelido de um Pokémon.
- Listagem de todos os Pokémon em sua coleção.
- Detalhes de um Pokémon específico.
- Exclusão de um Pokémon da coleção.

## Endpoints da API

Aqui estão os endpoints ativos na API, todos acessíveis através do arquivo rotas.js:

- POST /signup: Cadastro de usuário.
- POST /login: Login de usuário.
- POST /pokemons: Cadastro de um novo Pokémon.
- PUT /pokemons/:id: Atualização do apelido de um Pokémon específico.
- GET /pokemons: Listagem de todos os Pokémon em sua coleção.
- GET /pokemons/:id: Detalhes de um Pokémon específico.
- DELETE /pokemons/:id: Exclusão de um Pokémon da coleção.

## Instalação das Dependências

Antes de iniciar a API, você precisa instalar suas dependências. Certifique-se de ter o Node.js instalado em seu sistema. Em seguida, siga estas etapas:

```shell
npm install
```

## Dados Sensíveis

1. Renomeie o arquivo `dadosSensiveisExemplo` para `dadosSensiveis.js`.
2. Preencha os dados de acesso ao seu banco de dados.
3. Execute as tabelas em `dump.sql` para o funcionamento correto da API.

## Inicialização da API

Agora que todas as dependências estão instaladas, você pode iniciar a API. Certifique-se de que o banco de dados esteja configurado corretamente.

Para iniciar a API, execute o seguinte comando:

```shell
npm start
```

A API estará disponível em http://localhost:3000 por padrão. Você pode configurar a porta no arquivo index se desejar.

Quando receber o token de autorização ao realizar login, não esqueça de fornecer o mesmo no header da requisição (authorization) no formato Bearer Token para validar o usuário logado em todos os endpoints em que deseje acessar.
