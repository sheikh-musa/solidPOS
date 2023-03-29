// @refresh reload
import { Suspense } from "solid-js";
import {
	useLocation,
	A,
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from "solid-start";
import "./root.css";
import { CartProvider } from "./components/Cart.jsx";

export default function Root() {
	const location = useLocation();
	const active = (path: string) =>
		path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
	return (
		<Html lang="en">
			<Head>
				<Title>SolidStart - With TailwindCSS</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Body>
				<Suspense>
					<CartProvider>
						<ErrorBoundary>
							<nav class="bg-sky-800">
								<ul class="container flex items-center p-3 text-gray-200">
									<li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
										<A href="/">Home</A>
									</li>
									<li class={`border-b-2 ${active("/pos")} mx-1.5 sm:mx-6`}>
										<A href="/pos">POS</A>
									</li>
								</ul>
							</nav>
							<Routes>
								<FileRoutes />
							</Routes>
						</ErrorBoundary>
					</CartProvider>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	);
}
