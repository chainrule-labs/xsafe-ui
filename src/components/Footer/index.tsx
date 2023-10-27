import React from "react";
import { AiOutlineGithub } from "react-icons/ai";

function Footer() {
	return (
		<footer className="flex w-full items-center justify-center bg-dark-200 p-4 text-light-100">
			<a
				className="flex h-12 w-12 flex-shrink-0 items-center justify-center opacity-80 hover:opacity-100"
				href={process.env.GITHUB_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				<AiOutlineGithub size="28px" />
			</a>
			<a
				className="flex h-12 w-12 flex-shrink-0 items-center justify-center p-[15px] opacity-80 hover:opacity-100"
				href={process.env.TWITTER_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					className="opacity-90 hover:opacity-100"
					src="/images/iconX.svg"
					alt="twitter"
				/>
			</a>
		</footer>
	);
}

export default Footer;
