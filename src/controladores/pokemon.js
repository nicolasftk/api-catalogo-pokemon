const { pool } = require("./usuarios");

const cadastrarPokemon = async (req, res) => {
	const { nome, habilidades, imagem, apelido } = req.body;
	const { id } = req.usuario;

	if (!nome || !habilidades) {
		return res.status(400).json({ mensagem: "Nome e habilidades são obrigatórios." });
	}

	const query = `
    insert into pokemons (nome, habilidades, imagem, apelido, usuario_id)
    values ($1, $2, $3, $4, $5) returning *`;
	const body = [nome, habilidades, imagem, apelido, id];

	try {
		const novoPokemon = await pool.query(query, body);
		return res.status(201).json(novoPokemon.rows[0]);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ mensagem: "Erro ao realizar o cadastro." });
	}
};

const atualizarApelido = async (req, res) => {
	const { apelido, id } = req.body;

	try {
		const pokemonEncontrado = await pool.query(`select * from pokemons where id = $1`, [id]);

		if (pokemonEncontrado.rowCount < 1) {
			return res.status(404).json({ mensagem: "Pokémon não encontrado" });
		}

		if (!apelido || !id) {
			return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
		}

		const query = `update pokemons set apelido = $1 where id = $2 returning *`;
		const body = [apelido, id];
		const atualizarNome = await pool.query(query, body);

		return res.status(201).json({ Dados_atualizados: atualizarNome.rows[0] });
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ mensagem: "Erro no servidor" });
	}
};

const listagemPokemon = async (req, res) => {
	const query = `
    select poke.id, u.nome as usuario, poke.nome, poke.apelido, poke.habilidades, poke.imagem
    from pokemons as poke
    join usuarios as u on poke.usuario_id = u.id`;

	try {
		const lista = await pool.query(query);
		const listaFormatada = lista.rows.map((poke) => {
			return {
				id: poke.id,
				usuario: poke.usuario,
				nome: poke.nome,
				apelido: poke.apelido,
				habilidades: poke.habilidades.split(", "),
				imagem: poke.imagem,
			};
		});
		return res.json(listaFormatada);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ mensagem: "Erro no servidor" });
	}
};

const pokemonDetalhado = async (req, res) => {
	const { id } = req.body;

	if (!id) {
		return res.status(400).json({ mensagem: "O id é obrigatório." });
	}

	try {
		const query = `select * from pokemons where id = $1`;
		const pokemonEncontrado = await pool.query(query, [id]);

		if (pokemonEncontrado.rowCount < 1) {
			return res.status(404).json({ mensagem: "Pokémon não encontrado" });
		}

		return res.json(pokemonEncontrado.rows[0]);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ mensagem: "Erro no servidor" });
	}
};

const excluirPokemon = async (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.status(400).json({ mensagem: "O id é obrigatório." });
	}

	try {
		const query = `delete from pokemons where id = $1`;
		const pokemonEncontrado = await pool.query(query, [id]);

		if (pokemonEncontrado.rowCount < 1) {
			return res.status(404).json({ mensagem: "Pokémon não encontrado" });
		}

		return res.status(204).json();
	} catch (error) {}
};

module.exports = {
	cadastrarPokemon,
	atualizarApelido,
	listagemPokemon,
	pokemonDetalhado,
	excluirPokemon,
};
