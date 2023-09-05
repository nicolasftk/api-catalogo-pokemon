const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool } = require("./controladores/usuarios");
const segredo = require("./segredo");

const validarToken = async (req, res, next) => {
	const { authorization } = req.headers;
	const bearer = authorization.split(" ")[1];
	if (!authorization) {
		return res.status(401).json({ mensagem: "Não autorizado." });
	}
	try {
		const { id } = jwt.verify(bearer, segredo);

		const { rows, rowCount } = await pool.query("select * from usuarios where id = $1", [id]);
		if (rowCount < 1) {
			return res.status(401).json({ mensagem: "Não autorizado." });
		}
		// req.credenciais = token.id um ou outro
		req.usuario = rows[0];

		next();
	} catch (error) {
		console.log(error.message);
		return res.status(401).json({ mensagem: "Não autorizado." });
	}
};
module.exports = {
	validarToken,
};
