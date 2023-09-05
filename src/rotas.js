const express = require("express");
const { cadastrarUsuario, login } = require("./controladores/usuarios");
const { cadastrarPokemon, atualizarApelido, listagemPokemon, pokemonDetalhado, excluirPokemon } = require("./controladores/pokemon");
const { validarToken } = require("./intermediário");
const rotas = express();

rotas.post("/cadastro", cadastrarUsuario);
rotas.post("/login", login);
rotas.use(validarToken);
rotas.post("/cadastropokemon", cadastrarPokemon);
rotas.put("/apelidopokemon", atualizarApelido);
rotas.get("/listaPokemon", listagemPokemon);
rotas.get("/pokemon", pokemonDetalhado);
rotas.delete("/excluirpokemon", excluirPokemon);

module.exports = rotas;
