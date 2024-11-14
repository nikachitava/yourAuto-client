import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="container max-w-full bg-mainColor flex justify-between items-center py-5 border-t border-[#e9e9e9] mt-[100px]">
			<h1 className="text-white">All rights reserved</h1>
			<div className="flex items-center justify-between gap-4">
				<a
					href="https://www.linkedin.com/in/nikachitava18"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedin color="white" size={24} />
				</a>
				<a
					href="https://www.github.com/nikachitava"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithub color="white" size={24} />
				</a>
			</div>
		</div>
	);
};

export default Footer;
