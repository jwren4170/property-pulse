import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    // <!-- Footer -->
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Link href="/">
            <Image src={logo} alt="Logo" className="h-8 w-auto" />
          </Link>
        </div>

        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} PropertyPulse. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
