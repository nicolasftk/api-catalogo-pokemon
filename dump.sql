-- Active: 1692046027675@@127.0.0.1@5432@catalogo_pokemons
CREATE DATABASE catalogo_pokemons;

create table "usuarios" (
    id serial primary key not null,
    nome varchar(150) not null,
    email varchar(150) unique not null,
    senha text not null
);

create table "pokemons" (
    id serial primary key not null,
    usuario_id integer references usuarios(id) not null,
    nome varchar(150) not null,
    habilidades text not null,
    imagem text,
    apelido text
);


drop table "pokemons";