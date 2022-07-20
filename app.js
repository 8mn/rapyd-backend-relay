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

const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

const crypto = require("crypto");
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;
const log = false;

// const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);

// const configg = Buffer.from(JSON.stringify(serviceAccount)).toString("base64");

// console.log(configg);

// console.log(serviceAccount)

admin.initializeApp({
	credential: admin.credential.cert(
		JSON.parse(
			Buffer.from(process.env.GOOGLE_CONFIG_BASE64, "base64").toString("ascii")
		)
	),
});

const db = admin.firestore();


//get transactions from firebase
// function getTransactions(req, res) {
// 	db.collection("transactions")

// 		.get()
// 		.then((snapshot) => {
// 			let transactions = [];
// 			snapshot.forEach((doc) => {
// 				transactions.push(doc.data());
// 			});

// 			console.log(transactions);
// 		})
// 		.catch((err) => {
// 			console.log("Error getting documents", err);
// 		});
// }



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("json spaces", 4);

app.listen(process.env.PORT || 5000, () => {
	console.log("Server running on port 5000");
});

app.get("/country", async (req, res) => {
	try {
		const result = await makeRequest(
			"GET",
			"/v1/payment_methods/country?country=mx"
		);

		res.json(result);
	} catch (error) {
		res.json(error);
	}
});

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

app.get("/", async (req, res) => {
	try {
		res.json({
			message: "Hello World!",
		});
	} catch (error) {
		res.json(error);
	}
});

app.post("/create-wallet", async (req, res) => {
	try {
		const body = req.body;
		// console.log(body);
		const result = await makeRequest("POST", "/v1/user", body);
		res.json(result);
	} catch (error) {
		res.json(error);
	}
});

app.post("/request-virtual-account", async (req, res) => {
	try {
		const body = req.body;
		// console.log(body);
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

function sign(urlPath, salt, timestamp, body) {
	try {
		let bodyString = "";
		if (body) {
			bodyString = JSON.stringify(body);
			bodyString = bodyString == "{}" ? "" : bodyString;
		}

		let toSign =
			urlPath + salt + timestamp + accessKey + secretKey + bodyString;
		log && console.log(`toSign: ${toSign}`);

		let hash = crypto.createHmac("sha256", secretKey);
		hash.update(toSign);
		const signature = Buffer.from(hash.digest("hex")).toString("base64");
		log && console.log(`signature: ${signature}`);

		return signature;
	} catch (error) {
		console.error("Error generating signature");
		throw error;
	}
}

app.post("/hook", (req, res) => {
	// console.log(req.body);
	// console.log(req.headers);

	// httpBaseURL = "https://96b8-103-151-234-240.in.ngrok.io";
	httpURLPath = "https://96b8-103-151-234-240.in.ngrok.io/hook";
	salt = req.headers["salt"];
	timestamp = req.headers["timestamp"];
	body = req.body;

	signature = sign(httpURLPath, salt, timestamp, body);

	if (req.headers["signature"] === signature) {
		console.log("Signature is valid");
		// res.json({
		// 	message: "Signature is valid",
		// 	body: body,
		// });

		db.collection("transactions").add(body);

		res.send("OK");
	} else {
		console.log("Signature is invalid");
		// res.send("KO");
	}

	// res.sendStatus(200).end();
});
