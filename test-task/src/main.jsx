import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<App />}
		>
			<Route
				index={true}
				path="/"
				element={<Login />}
			/>
			<Route
				path="/home"
				element={<Gallery />}
			/>
		</Route>
	)
);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-wniro7da2k1l6cww.us.auth0.com"
			clientId="KT87mq4siSmco5CMCgCvJxO85iaAbWYi"
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
		>
			<RouterProvider router={router} />
		</Auth0Provider>
	</React.StrictMode>
);
