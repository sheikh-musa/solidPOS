import { createContext, useContext, createSignal, createResource, For } from "solid-js";
import { createOrder, updateOrder } from "../api/Woo";
// import { orders } from "./Transactions";
import { storageAvailable } from "../api/LocalStorage";

const CartContext = createContext();

function CartProvider(props) {
	const [cartItems, setCartItems] = createSignal([]);
	// if (storageAvailable("localStorage")) {
	// 	if (localStorage.getItem("cart")) {
	// 		setCartItems(JSON.parse(localStorage.getItem("cart")));
	// 	}
	// } else {
	// 	alert("local storage unavailable");
	// }

	const addItemToCart = (item) => {
		const existingItemIndex = cartItems().findIndex((cartItem) => cartItem.id === item.id);
		if (existingItemIndex >= 0) {
			const updatedCartItems = [...cartItems()];
			updatedCartItems[existingItemIndex].quantity += item.quantity;
			setCartItems(updatedCartItems);
			localStorage.setItem("cart", JSON.stringify(cartItems()));
		} else {
			setCartItems([...cartItems(), item]);
			localStorage.setItem("cart", JSON.stringify(cartItems()));
		}
	};

	const removeItemFromCart = (itemId) => {
		setCartItems(cartItems().filter((item) => item.id !== itemId));
		localStorage.setItem("cart", JSON.stringify(cartItems()));
	};

	const clearCart = () => {
		setCartItems([]);
		localStorage.removeItem("cart");
	};

	const cartTotal = () => {
		return cartItems().reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);
	};

	const cashCheckout = () => {
		let cart = cartItems();
		let data = {
			line_items: [],
			payment_method: "cod",
			payment_method_title: "Cash",
			set_paid: true,
		};
		for (let i = 0; i < cart.length; i++) {
			const { id, sku, name, price, ...wooData } = cart[i];
			data.line_items.push(wooData);
		}
		createOrder(data);
		clearCart();
	};

	const refund = (id) => {
		let data = {
			status: "refunded",
		};
		updateOrder(data, id);
	};

	const cancel = (id) => {
		let data = {
			status: "cancelled",
		};
		updateOrder(data, id);
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addItemToCart,
				removeItemFromCart,
				clearCart,
				cartTotal,
				cashCheckout,
				refund,
				cancel,
			}}
		>
			{props.children}
		</CartContext.Provider>
	);
}

function useCart() {
	return useContext(CartContext);
}

function ShoppingCart() {
	const { cartItems, addItemToCart, removeItemFromCart, clearCart, cartTotal, cashCheckout } =
		useCart();
	function getProductData(item, quantity) {
		const product = document.querySelector(`#product-${item.id}`);
		return {
			id: Number(product.dataset.id),
			product_id: product.dataset.id,
			sku: product.dataset.sku,
			name: product.dataset.name,
			price: product.dataset.price,
			quantity: quantity,
		};
	}

	return (
		<div>
			<h1 class="text-center">Shopping Cart</h1>
			{cartItems().length === 0 ? (
				<>
					<p class="text-center">Your cart is empty.</p>
				</>
			) : (
				<>
					<table class="table-auto w-full text-center">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Quantity</th>
								<th>Amount</th>
								<th>Remove</th>
							</tr>
						</thead>
						<tbody>
							{cartItems().map((item) => (
								<tr
									id={`product-${item.id}`}
									data-id={item.id}
									data-sku={item.sku}
									data-name={item.name}
									data-price={item.price}
								>
									<td>{item.name}</td>
									<td>
										{item.quantity}{" "}
										<div class="inline-flex">
											<button
												class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
												onclick={() => {
													addItemToCart(getProductData(item, 1));
												}}
											>
												+
											</button>
											<button
												class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
												onclick={() => {
													item.quantity > 1
														? addItemToCart(getProductData(item, -1))
														: removeItemFromCart(item.id);
												}}
											>
												-
											</button>
										</div>
									</td>
									<td>{(item.price * item.quantity).toFixed(2)}</td>
									<td>
										<button
											onclick={() => removeItemFromCart(item.id)}
											class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-blue-500 disabled:text-white disabled:font-bold disabled:py-2 disabled:px-4 disabled:rounded disabled:opacity-50 disabled:cursor-not-allowed"
										>
											X
										</button>
									</td>
								</tr>
							))}
							<tr>
								<td></td>
								<td></td>
								<td>
									<strong>Total: ${cartTotal().toFixed(2)}</strong>
								</td>
								<td>
									<button
										class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
										onClick={clearCart}
									>
										Clear Cart
									</button>
								</td>
							</tr>
						</tbody>
					</table>

					<hr />

					<div class="flex flex-row justify-evenly items-center h-20">
						<div>
							<button
								class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
								onclick={cashCheckout}
							>
								Cash Payment
							</button>
						</div>
						<div>
							<button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
								PayNow
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export { CartProvider, useCart, ShoppingCart };
