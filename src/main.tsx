import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PagesRouter from "./PagesRouter";
import { SearchFilterProvider } from "./context/SearchFilterContext";
import { Toaster } from "@/components/ui/toaster";
import { AuthorizationContextProvider } from "./context/AuthorizationContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthorizationContextProvider>
				<SearchFilterProvider>
					<Toaster />
					<PagesRouter />
				</SearchFilterProvider>
			</AuthorizationContextProvider>
		</BrowserRouter>
	</StrictMode>
);
