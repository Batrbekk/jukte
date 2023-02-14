import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<script type="module" src="https://test.biometric.kz/liveness-detection/DistancePackage.js"></script>
			</Head>
			<body>
			<Main />
			<NextScript />
			</body>
		</Html>
	)
}
