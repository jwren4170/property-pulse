import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Property Pulse",
  description: "Find local rental properties",
  keywords: "property, property search, rental properties, real estate",
  icons: {
    icon: "/logo-white.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
