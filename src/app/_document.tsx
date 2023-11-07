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
				{/* ******* Open Graph & Twitter Cards ******* */}
				<title>xSafe</title>
				<meta
					name="description"
					content="Redefining multi-chain deployment: same address, no nonces, no salts."
				/>

				<meta property="og:url" content="https://xsafe.chainrule.io/" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="xSafe" />
				<meta
					property="og:description"
					content="Redefining multi-chain deployment: same address, no nonces, no salts."
				/>
				<meta property="og:image" content="/meta-card-image.png" />

				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="xsafe.chainrule.io" />
				<meta
					property="twitter:url"
					content="https://xsafe.chainrule.io/"
				/>
				<meta name="twitter:title" content="xSafe" />
				<meta
					name="twitter:description"
					content="Redefining multi-chain deployment: same address, no nonces, no salts."
				/>
				<meta name="twitter:image" content="/meta-card-image.png" />
				{/* ****************************************** */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
