import { createSignal } from "solid-js";

var authHeaders = new Headers();
authHeaders.append(
	"Authorization",
	"Basic Y2tfNDY1ZGQ1MzNmMGQ5OWZjZTRkMzE1ZjA0NzEwNWQwMTA0NmZkNmE3ODpjc180NmJjMzUxZGNlZjE1MTIxNDEwYmY1ZDE3YzlhMjFlMmYzOTFmYzNl"
);
authHeaders.append("Content-Type", "application/json");

var getRequestOptions = {
	method: "GET",
	headers: authHeaders,
	redirect: "follow",
};

const fetchProducts = async () => {
	const response = await fetch("https://one18bakery.com/wp-json/wc/v3/products", getRequestOptions);
	return response.json();
};

const fetchOrders = async () => {
	const response = await fetch("https://one18bakery.com/wp-json/wc/v3/orders", getRequestOptions);
	return response.json();
};

var postRequestOptions = {
	method: "POST",
	headers: authHeaders,
	body: "",
	redirect: "follow",
};

const createOrder = async (data) => {
	postRequestOptions.body = JSON.stringify(data);
	fetch("https://one18bakery.com/wp-json/wc/v3/orders", postRequestOptions)
		.then((response) => response.text())
		.then((result) => {
			console.log(JSON.parse(result));
		})
		.catch((error) => console.log("error", error));
};

var putRequestOptions = {
	method: "PUT",
	headers: authHeaders,
	body: "",
	redirect: "follow",
};

const updateOrder = async (data, id) => {
	putRequestOptions.body = JSON.stringify(data);
	fetch(`https://one18bakery.com/wp-json/wc/v3/orders/${id}`, putRequestOptions)
		.then((response) => response.text())
		.then((result) => {
			console.log(JSON.parse(result));
		})
		.catch((error) => console.log("error", error));
};

// const createOrder = async (data) => {
// 	console.log(data);
// 	console.log(JSON.stringify(data));
// 	postRequestOptions.body = JSON.stringify(data);
// 	console.log(postRequestOptions.body);
// 	const response = await fetch("https://one18bakery.com/wp-json/wc/v3/orders", postRequestOptions);
// 	return response;
// };

export { fetchProducts, createOrder, fetchOrders, updateOrder };
