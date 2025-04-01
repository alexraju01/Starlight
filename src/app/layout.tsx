import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Starlight",
	description: "Starlight a place where you can find all your favourite movies and tv show",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${inter.className} flex w-full h-full bg-[#100f10] text-white`}>
				{children}
			</body>
		</html>
	);
}
