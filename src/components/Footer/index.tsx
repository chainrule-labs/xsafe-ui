import React from "react";
import { FaGithub, FaTelegram, FaXTwitter } from "react-icons/fa6";

import IconLink from "../IconLink";
import TextLink from "../TextLink";

function Footer() {
	return (
		<footer className="flex w-full max-w-4xl flex-col items-center justify-center p-4">
			<div className="flex w-full max-w-screen-xl flex-col items-center smd:flex-row smd:justify-between">
				<div className="flex flex-col items-center justify-center xs:flex-row">
					<TextLink
						text="Chain Rule"
						url={process.env.CHAIN_RULE_URL}
					/>
					<TextLink text="Docs" url={process.env.DOCS_URL} />
					<TextLink text="FAQ" url={process.env.FAQ_URL} />
				</div>
				<div className="mt-4 smd:mt-0">
					<div className="flex h-12 items-center justify-center">
						<IconLink
							Icon={FaGithub}
							url={process.env.GITHUB_URL}
							size="28px"
						/>
						<IconLink
							Icon={FaXTwitter}
							url={process.env.TWITTER_URL}
							size="28px"
						/>
						<IconLink
							Icon={FaTelegram}
							url={process.env.TELEGRAM_URL}
							size="28px"
						/>
					</div>
				</div>
			</div>
			<div className="mt-4 flex flex-col py-3">
				<span className="text-center">© 2023 Chain Rule, LLC</span>
				<span className="text-center">All rights reserved</span>
			</div>
		</footer>
	);
}

export default Footer;
