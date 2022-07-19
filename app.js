/**
 * Rapyd Integrations: Request Signature.
 *
 * This app implements the Rapyd's API request signature. The crypto-js library
 * is required (https://www.npmjs.com/package/crypto-js). To install it, run:
 *
 * npm install crypto-js
 *
 * @link   https://docs.rapyd.net/
 * @file   This files defines the main node.js application.
 * @author Isaac Benitez.
 * @version 0.0.1
 *
 * @requires express
 * @requires https
 * @requires crypto-js
 */

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const makeRequest = require("./utilities").makeRequest;

// const jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("json spaces", 4);

app.listen(5000, () => {
	console.log("Server running on port 5000");
});

// app.get("/country", async (req, res) => {
// 	try {
// 		const result = await makeRequest(
// 			"GET",
// 			"/v1/payment_methods/country?country=mx"
// 		);

// 		res.json(result);
// 	} catch (error) {
// 		res.json(error);
// 	}
// });

// app.get("/payment", async (req, res) => {
// 	try {
// 		const body = {
// 			amount: 230,
// 			currency: "MXN",
// 			payment_method: {
// 				type: "mx_diestel_cash",
// 			},
// 		};
// 		const result = await makeRequest("POST", "/v1/payments", body);
// 		res.json(result);
// 	} catch (error) {
// 		res.json(error);
// 	}
// });

app.post("/create-wallet", async (req, res) => {
	try {
		const body = req.body;
		console.log(body);
		const result = await makeRequest("POST", "/v1/user", body);
		res.json(result);
	} catch (error) {
		res.json(error);
	}
});

app.post("/request-virtual-account", async (req, res) => {
	try {
		const body = req.body;
		console.log(body);
		const result = await makeRequest("POST", "/v1/issuing/bankaccounts", body);
		res.json(result);
	} catch (error) {
		res.json(error);
	}
});

app.post("/simulate-payment", async (req, res) => {
	try {
		const body = req.body;
		// console.log(body);
		const result = await makeRequest(
			"POST",
			"/v1/issuing/bankaccounts/bankaccounttransfertobankaccount",
			body
		);
		res.json(result);
	} catch (error) {
		res.json(error);
	}
});

// app.get("/country", async (req, res) => {
// 	try {
// 		const result = await makeRequest(
// 			"GET",
// 			"/v1/payment_methods/country?country=mx"
// 		);

// 		res.json(result);
// 	} catch (error) {
// 		res.json(error);
// 	}
// });


// app.get("/list-virtual-accounts", async (req, res) => {
// 	try {
// 		const result = await makeRequest(
// 			"GET",
// 			"/v1/bankaccounts/list?ewallet=ewallet_5d616c29e44b710fcb040c95a94eac72"
// 		);
// 		res.json(result);
// 	} catch (error) {
// 		res.json(error);
// 	}
// });


