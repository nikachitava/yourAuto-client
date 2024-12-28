import { Routes, Route } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Auth from "./pages/Auth";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AddVehiclePage from "./pages/AddVehiclePage";
import EditVehicleData from "./pages/EditVehicleData";
import UserProfile from "./pages/UserProfile";
import React from "react";
import withAuth from "./components/custom/ProtectedRoute";

const LazyVehiclePage = React.lazy(() => import("./pages/VehiclePage"));

const PagesRouter = () => {
	const ProtectedAddVehiclePage = withAuth({
		WrappedComponent: AddVehiclePage,
	});
	const ProtectedVehiclePage = withAuth({
		WrappedComponent: LazyVehiclePage,
	});
	const ProtectedEditVehiclePage = withAuth({
		WrappedComponent: EditVehicleData,
	});
	const ProtectedUserProfile = withAuth({ WrappedComponent: UserProfile });

	return (
		<Routes>
			{/* Default Layout */}
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<Home />} />
				<Route
					path="/addvehicle"
					element={<ProtectedAddVehiclePage />}
				/>
				<Route path="/vehicle/:id" element={<ProtectedVehiclePage />} />
				<Route
					path="/editvehicle/:id"
					element={<ProtectedEditVehiclePage />}
				/>
				<Route path="/profile/:id" element={<ProtectedUserProfile />} />
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
