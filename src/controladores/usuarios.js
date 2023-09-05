const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const senhaSegura = require("../segredo");
const { hostBd, portBd, userBd, passwordBd, databaseBd } = require("../../../dadosSensiveis");

const pool = new Pool({
	host: hostBd,
	port: portBd,
	user: userBd,
	password: passwordBd,
	database: databaseBd,
});

const cadastrarUsuario = async (req, res) => {
	const { nome, email, senha } = req.body;
	if (!nome || !email || !senha) {
		return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
	}
	const senhaCriptografada = await bcrypt.hash(senha, 10);
	const query = `
    insert into usuarios (nome, email, senha)
    values ($1, $2, $3) returning *`;
	const body = [nome, email, senhaCriptografada];
	try {
		const novoUsuario = await pool.query(query, body);
		return res.status(201).json(novoUsuario.rows[0]);
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
	}
};

const login = async (req, res) => {
	const { email, senha } = req.body;
	const query = `select * from usuarios where email = $1`;
	const body = [email];
	if (!email || !senha) {
		return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
	}

	try {
		const usuario = await pool.query(query, body);
		if (usuario.rowCount < 1) {
			return res.status(404).json({ mensagem: "Usuário não encontrado." });
		}
		const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

		if (!senhaValida) {
			return res.status(401).json({ mensagem: "Email ou senha invalida." });
		}
		const { senha: _, email: __, ...usuarioLogado } = usuario.rows[0];
		const token = jwt.sign({ id: usuario.rows[0].id, nome: usuario.rows[0].nome }, senhaSegura, { expiresIn: "4h" });

		console.log(usuarioLogado);
		res.json({ usuario: usuarioLogado, token });
	} catch (error) {
		console.log(error.message);

		res.status(500).json({ mensagem: "Erro ao autenticar o usuário." });
	}
};
module.exports = {
	cadastrarUsuario,
	login,
	pool,
};
