const express = require('express')
const app = express();
var bodyParser = require('body-parser');
const Joi = require('joi');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/car', async function (req, res) {

	let bodyParams = req.body;

	console.log("Entrying following data in db:");
	// console.log(JSON.stringify(bodyParams));
	console.log(bodyParams);

	let resObject = {
		status: 201,
		data: "New Car added in db"
	}
	res.send(resObject)
});


const handler = (req, res) => {

	let bodyParams = req.body;

	console.log("Entrying following data for user in db:");
	console.log(JSON.stringify(bodyParams));

	console.log(bodyParams);

	let resObject = {
		status: 201,
		data: "New user added in db"
	}
	res.send(resObject)
}

const userMiddleware = (req, res, next) => {

	const schema = Joi.object().keys({
		username: Joi.string().required(),
		password: Joi.string().min(4).max(15).required(),
		gender: Joi.boolean().required(),
		age: Joi.number()
	});
//console.log(schema)
	const { value, error } = Joi.compile(schema)
		.prefs({ errors: { label: 'key' }, abortEarly: false })
		.validate(req.body);
        //console.log(error);
	const valid = error == null;

	console.log("valid? ===> ", valid);

	if (!valid) {
		console.log("Validation failed");
		let resObject = {
			status: 400,
			msg: "Validation failed"
		}
		res.send(resObject)
	} else {
		next()
	}
}

app.post('/users', userMiddleware, handler);

app.listen(7000, () => {
	console.log(`Techlift app listening on port ${7000}`)
})



//https://github.com/frazbakht5/techlift-teaching/blob/node-class-demo/node-js/index.js