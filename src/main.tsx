import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PagesRouter from "./PagesRouter";
import { SearchFilterProvider } from "./context/SearchFilterContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/custom/theme-provider";
import { AuthorizationContextProvider } from "./context/AuthorizationContext";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthorizationContextProvider>
			<SearchFilterProvider>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<Toaster />
					<PagesRouter />
				</ThemeProvider>
			</SearchFilterProvider>
		</AuthorizationContextProvider>
	</StrictMode>
);
