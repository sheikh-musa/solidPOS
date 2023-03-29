import { createSignal, onMount, For, createResource } from "solid-js";
import { fetchOrders } from "../api/Woo";
import { useCart } from "./Cart";

const [orders, { mutate, refetch }] = createResource(fetchOrders);

function Transactions() {
	const { refund, cancel } = useCart();

	return (
		<>
			<table class="table-auto w-full text-center">
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Amount</th>
						<th>Status</th>
						<th>Refund</th>
						<th>Cancel</th>
					</tr>
				</thead>
				<tbody>
					<For each={orders()}>
						{(order) => (
							<tr>
								<td>{order.id}</td>
								<td>${order.total}</td>
								<td>{order.status}</td>
								<td>
									<button
										class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-blue-500 disabled:text-white disabled:font-bold disabled:py-2 disabled:px-4 disabled:rounded disabled:opacity-50 disabled:cursor-not-allowed"
										disabled={order.status == "refunded" || order.status == "cancelled"}
										onclick={() => refund(order.id)}
									>
										Refund
									</button>
								</td>
								<td>
									<button
										class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-blue-500 disabled:text-white disabled:font-bold disabled:py-2 disabled:px-4 disabled:rounded disabled:opacity-50 disabled:cursor-not-allowed"
										disabled={order.status == "refunded" || order.status == "cancelled"}
										onclick={() => cancel(order.id)}
									>
										Cancel
									</button>
								</td>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</>
	);
}

export { Transactions, orders };
