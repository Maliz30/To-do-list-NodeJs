const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.json");

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

const registerLoginHome = (req, res) => {
	const { email } = req.body.email;
	const { password } = req.body.password;

	res.render("registerLogin", { 
		email, 
		password,
	});
}

const registerUser = async (req, res) => {
	const user = req.body;
	email = user.email;

	try {
		if (await User.findOne({ email }))
			res.status(400).send({ error: "Email já cadastrado!" });

		user = await User.create(req.body);

		user.password = undefined;

		return res.send({ 
            user,
            token: generateToken({ id: user._id }),
        });		

	} catch (err) {
		res.status(400).send({ error: err.message });
	}

};

const authenticateUser = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	user = await User.findOne({ email }).select("+password");

	if (!user) 
        return res.status(400).send({ error: "Usuário não cadastrado" });

	if (!await bcrypt.compare(password, user.password))
		return res.status(400).send({ error: "Senha incorreta" });

    user.password = undefined;

	res.send({ 
        user, 
        token: generateToken({ id: user._id }),
    });
};

module.exports = {
	registerLoginHome,
	registerUser,
	authenticateUser,
};
