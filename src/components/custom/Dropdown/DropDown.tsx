import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

interface IDropDown {
	title: string;
	children: React.ReactNode;
	disabled?: boolean;
}

const DropDown: React.FC<IDropDown> = ({ title, children, disabled }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen((isMenuOpen) => !isMenuOpen);
	};

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`relative ${disabled && "cursor-not-allowed"}`}
			ref={dropdownRef}
		>
			<div
				className={`min-w-[250px]  flex items-center justify-between gap-3 px-8 py-4 border-[1px] rounded-lg  border-[#000] dark:border-white cursor-pointer ${
					disabled && "cursor-not-allowed pointer-events-none"
				}`}
				onClick={toggleMenu}
			>
				<p>{title}</p>
				{isMenuOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
			</div>
			{isMenuOpen && <>{children}</>}
		</div>
	);
};

export default DropDown;
