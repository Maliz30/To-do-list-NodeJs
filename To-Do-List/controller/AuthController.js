const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

const registerUser = async (req, res) => {
	const { email } = req.body;

	try {
		if (await User.findOne({ email }))
			res.status(400).send({ error: "Email já cadastrado!" });

		const user = await User.create(req.body);

		user.password = undefined;
		res.send({ 
            user,
            token: generateToken({ id: user.id }),
        });

		return res.redirect("/home");

	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

const authenticateUser = async (req, res) => {
	const { email } = req.body;
	const { password } = req.body;

	const user = await User.findOne({ email }).select("+password");

	if (!user) 
        res.status(400).send({ error: "Usuário não cadastrado" });

	if (!await bcrypt.compare(password, user.password))
		res.status(400).send({ error: "Senha incorreta" });

    user.password = undefined;

	res.send({ 
        user, 
        token: generateToken({ id: user.id }),
    });
};

module.exports = {
	registerUser,
	authenticateUser,
};
