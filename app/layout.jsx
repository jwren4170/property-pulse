import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import "@/assets/styles/styles.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
