import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Auth from "./pages/Auth";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import AddVehiclePage from "./pages/AddVehiclePage";
import EditVehicleData from "./pages/EditVehicleData";
import UserProfile from "./pages/UserProfile";
import React from "react";

const LazyVehiclePage = React.lazy(() => import("./pages/VehiclePage"));

const PagesRouter = () => {
	const AuthenticatedAddVehiclePage = ProtectedRoute(AddVehiclePage);
	const AuthenticatedVehiclePage = ProtectedRoute(LazyVehiclePage);
	const AuthenticatedEditVehiclePage = ProtectedRoute(EditVehicleData);
	const AuthenticatedUserPage = ProtectedRoute(UserProfile);

	return (
		<Routes>
			{/* Default Layout */}
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<Home />} />
				<Route
					path="/addvehicle"
					element={<AuthenticatedAddVehiclePage />}
				/>
				<Route
					path="/vehicle/:id"
					element={<AuthenticatedVehiclePage />}
				/>
				<Route
					path="/editvehicle/:id"
					element={<AuthenticatedEditVehiclePage />}
				/>
				<Route
					path="/profile/:id"
					element={<AuthenticatedUserPage />}
				/>
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
	);
};

export default PagesRouter;
