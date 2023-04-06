import { A } from "solid-start";
import Counter from "~/components/Counter";
import Products from "~/components/Products";
import { ShoppingCart } from "../components/Cart";

export default function POS() {
	return (
		<main class="text-center mx-auto text-gray-700 p-4">
			<Products />
			<ShoppingCart />
			{/* <Counter /> */}
			{/* <p class="mt-8">
				Visit{" "}
				<a href="https://solidjs.com" target="_blank" class="text-sky-600 hover:underline">
					solidjs.com
				</a>{" "}
				to learn how to build Solid apps.
			</p>
			<p class="my-4">
				<A href="/" class="text-sky-600 hover:underline">
					Home
				</A>
				{" - "}
				<span>About Page</span>
			</p> */}
		</main>
	);
}
