import { createSignal, onMount, For, createResource } from "solid-js";
import { useCart } from "./Cart";
import { fetchProducts } from "../api/Woo";

export default function Products() {
	const { addItemToCart } = useCart();
	const [products] = createResource(fetchProducts);

	const handleAddToCart = (id, sku, name, price, discount) => {
		addItemToCart({
			id: id,
			product_id: id,
			sku: sku,
			name: name,
			price: price,
			discount: discount,
			quantity: 1,
		});
	};

	return (
		<>
			<div class="w-screen flex flex-col md:flex-row">
				<For each={products()}>
					{(product) => (
						<div
							// onclick={() => setCart(cart() + Number(product.price))}
							onClick={() =>
								handleAddToCart(
									product.id,
									product.sku,
									product.name,
									Number(product.price),
									product.attributes[0]
								)
							}
							class="min-w-min md:h-60 w-full bg-cover bg-no-repeat bg-center"
							style={`background-image: url(${product.images[0]?.src}`}
						>
							<div class="w-full h-full flex flex-row justify-center items-center backdrop-brightness-50">
								<div class="text-white text-4xl w-1/2 text-center">
									{product.name} - Stock: {product.stock_quantity}
								</div>
							</div>
						</div>
					)}
				</For>
			</div>
			{/* <div>{cart().toFixed(2)}</div> */}
		</>
	);
}
