# API de Catálogo de Pokémon

Esta é uma API para catalogar Pokémon com uso de tecnologias de autenticação de usuário. Ela permite que você adicione, atualize, liste e exclua Pokémon em sua coleção, com cada usuário tendo seu próprio catálogo de Pokémon.

## Funcionalidade

A API oferece as seguintes funcionalidades:

#### Cadastro de Usuário
- **Campos Exigidos:** nome, email, senha criptografada.

#### Login de Usuário
- **Campos Exigidos:** email, senha.

#### Cadastro de Pokémon
- **Campos Exigidos:** nome, habilidades.
- **Campos Opcionais:** apelido, imagem.

#### Atualização do Apelido de um Pokémon
- **Campos Exigidos:** id, apelido.

#### Detalhes de um Pokémon Específico
- **Campos Exigidos:** id.

#### Exclusão de um Pokémon da Coleção
- **Campos Exigidos:** id.

## Endpoints da API

Aqui estão os endpoints ativos na API, todos acessíveis através do arquivo rotas.js:

- POST /cadastro  Cadastro de usuário.
- POST /login Login de usuário.
- POST /cadastropokemon: Cadastro de um novo Pokémon.
- PUT /apelidopokemon Atualização do apelido de um Pokémon específico.
- GET /listapokemon: Listagem de todos os Pokémon em sua coleção.
- GET /pokemon Detalhes de um Pokémon específico.
- DELETE /excluirpokemon Exclusão de um Pokémon da coleção.

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
