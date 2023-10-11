import "../styles/globals.css";
import type { Metadata } from "next";

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
					<header className="flex w-full items-center justify-between border-b border-b-[#395754] px-4 py-2">
						<div className="relative flex w-14 justify-center outline-none">
							<img src="/images/iconXsafe.svg" alt="xsafe-icon" />
						</div>
						<span>TEST HEADER</span>
					</header>
					{children}
					<footer className="flex w-full items-center justify-center bg-[#395754] p-4 text-white">
						TEST FOOTER
					</footer>
				</main>
			</body>
		</html>
	);
}
