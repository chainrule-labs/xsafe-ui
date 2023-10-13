import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					color="#395754" // dark-200
				/>
				<meta
					name="msapplication-TileColor"
					content="#addad5" // light-200
				/>
				<meta
					name="theme-color"
					content="#addad5" // light-200
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
