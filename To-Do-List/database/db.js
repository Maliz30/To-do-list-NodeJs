const mongoose = require("mongoose");

const connectToDb = () => {
	mongoose
		.connect(
			"mongodb+srv://todo:admin@todolist-nodejs.hex5v6i.mongodb.net/?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		.then(() => console.log("MongoDB Atlas conectado"))
		.catch((err) => console.log(err));
};

module.exports = connectToDb;
