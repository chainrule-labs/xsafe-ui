import "../styles/globals.css";

import type { Metadata } from "next";
import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReduxProvider } from "../state/reduxProvider";

export const metadata: Metadata = {
	title: "xSafe",
	description:
		"Redefining multi-chain deployment: same address, no nonces, no salts.",
	openGraph: {
		title: "xSafe",
		description:
			"Redefining multi-chain deployment: same address, no nonces, no salts.",
		url: "https://xsafe.chainrule.io/",
		type: "website",
		images: [
			{
				url: "https://xsafe.chainrule.io/card-image.png",
			},
		],
	},
	twitter: {
		title: "xSafe",
		description:
			"Redefining multi-chain deployment: same address, no nonces, no salts.",
		card: "summary_large_image",
		images: [
			{
				url: "https://xsafe.chainrule.io/card-image.png",
			},
		],
		site: "https://xsafe.chainrule.io/",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex min-h-screen flex-col bg-dark-600 text-light-200">
				<main className="flex w-full min-w-[300px] flex-1 flex-col items-center">
					<ReduxProvider>
						<Header />
						{children}
						<Footer />
					</ReduxProvider>
				</main>
			</body>
		</html>
	);
}
