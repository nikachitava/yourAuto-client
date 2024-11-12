import { useContext, useState } from "react";
import { MdMenuOpen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { SlLogin } from "react-icons/sl";
// import { ModeToggle } from "./mode-toggle";
import { AuthorizationContext } from "@/context/AuthorizationContext";
import { CiLogout } from "react-icons/ci";

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	const toggleMenu = () => {
		if (isMenuOpen) {
			setIsAnimating(true);
			setTimeout(() => {
				setIsAnimating(false);
				setIsMenuOpen(false);
			}, 500);
		} else {
			setIsMenuOpen(true);
		}
	};

	const { currentUser, logOut } = useContext(AuthorizationContext);

	return (
		<div className="container max-w-full bg-mainColor flex justify-between items-center py-10 relative">
			<div
				className={`absolute h-screen w-full top-0 left-0 bg-slate-700 transition-all duration-500 z-10 ${
					isMenuOpen ? "block" : "hidden"
				} ${isAnimating ? "animate-slideUp" : "animate-slideDown"}`}
			>
				<ul className="flex flex-col justify-center h-screen m-auto items-center gap-6 text-white">
					<li>
						<SlLogin size={24} />
					</li>
				</ul>
				<IoMdClose
					size={24}
					color="white"
					className="absolute top-5 right-10 cursor-pointer"
					onClick={toggleMenu}
				/>
			</div>

			<Link to={"/"}>
				<h1 className="font-bold text-2xl text-white">yourAuto</h1>
			</Link>
			<div className="block md:hidden">
				<MdMenuOpen
					size={24}
					className="cursor-pointer"
					color="white"
					onClick={toggleMenu}
				/>
			</div>
			<div className="hidden md:block">
				<ul className="flex justify-center items-center gap-6 text-white">
					<li className="text-[15px] font-medium">
						<Link to={"/"}>Home</Link>
					</li>
					<li>
						{currentUser ? (
							<CiLogout
								size={24}
								className="cursor-pointer"
								color="black"
								onClick={logOut}
							/>
						) : (
							<Link
								to={"/login"}
								className="flex items-center gap-2"
							>
								<SlLogin size={15} className="cursor-pointer" />
								<span className="text-[15px] font-medium">
									Sign in
								</span>
							</Link>
						)}
					</li>
					{currentUser && (
						<li className="bg-white text-mainColor rounded-3xl py-2 px-6">
							<Link to={"/addvehicle"}>Submit Listing</Link>
						</li>
					)}
					{currentUser && (
						<li>
							<Link to={`/profile/${currentUser._id}`}>
								<p className="cursor-pointer">My Profile</p>
							</Link>
						</li>
					)}
					{/* <li>
						<ModeToggle />
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default NavBar;
