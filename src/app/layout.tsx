import "../styles/globals.css";

import type { Metadata } from "next";
import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReduxProvider } from "../state/reduxProvider";

export const metadata: Metadata = {
	title: "xSafe",
	description:
		"An open source user interface for the cross-chain contract aggregation tool, xSafe.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="flex min-h-screen flex-col bg-black text-[#addad5]">
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
