import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Auth from "./pages/Auth";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";

const PagesRouter = () => {
	return (
		<Router>
			<Routes>
				{/* Default Layout */}
				<Route element={<DefaultLayout />}>
					<Route path="/" element={<Home />} />
				</Route>

				{/* Auth Layout */}
				<Route element={<AuthLayout />}>
					<Route path="/login" element={<Auth />} />
				</Route>

				{/* Admin Dashboard Layout */}
				<Route element={<DashboardLayout />}>
					<Route path="/admin" element={<Dashboard />} />
				</Route>

				<Route path="*" element={<h1>404 Page Not found</h1>} />
			</Routes>
		</Router>
	);
};

export default PagesRouter;
