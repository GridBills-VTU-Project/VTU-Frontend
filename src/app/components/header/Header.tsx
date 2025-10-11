"use client";

import Image from "next/image";
// import { Moon, Sun } from "lucide-react";
import "./header.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [
  { name: "Home", href: "/" },
  { name: "become an agent", href: "/agent" },
  { name: "contact us", href: "/contact" },
];
const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="text-[#fff] not-italic sticky bg-darkbackground z-50  h-[120px] flex">
      <div className="flex items-center justify-between not-italic mx-auto w-[80%]">
        <div className="flex items-center gap-10">
          <div
            className={
              "mobile:hidden mr-7 relative z-50" +
              (menuOpen ? " toggle-btn" : " ")
            }
          >
            <div
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
              className="menu"
              onClick={() => setMenuOpen(!menuOpen)}
              role="button"
              tabIndex={0}
              onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                // event.preventDefault();
                if (event.key === "Enter" || event.key === " ") {
                  setMenuOpen(!menuOpen);
                }
              }}
            ></div>
          </div>
          <Link href={"/"} aria-label="Home">
            <Image
              className="not-mobile:w-[36px] not-mobile:h-[36px] mobile:ml-15"
              src="/vtu-logo.png"
              alt="VTU Logo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <nav className="not-mobile:hidden mr-2 capitalize transition-all duration-300 ease-in-out">
          <ul className="flex items-center text-[18px] font-medium leading-[22px] gap-5">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  aria-label={link.name}
                  className={
                    pathname == link.href ? " isActive" : "hover:opacity-70"
                  }
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex items-center font-semibold text-xl leading-[22px] ml-4 gap-7 not-sm:text-[10px] not-sm:gap-3">
          <li>
            <Link
              href={"/login"}
              className="border px-4 py-1 rounded-[8px] hover:bg-[#fff] hover:text-[#000000] hover:border-[#000000]"
            >
              log in
            </Link>
          </li>
          <li>
            <Link
              href={"/login"}
              className="bg-[#fff] border-1 px-4 py-1 rounded-[8px] text-[#000000] hover:text-[#fff] hover:border-[#fff] hover:bg-transparent"
            >
              sign up
            </Link>
          </li>
        </ul>
      </div>
      <nav
        className={
          "mobile:hidden flex items-center gap-18 pt-10 flex-col bg-darkbackground h-[100dvh] min-w-[50%] not-sm:min-w-full absolute top-25 left-0 z-40 transition-all duration-500 " +
          (menuOpen ? " translate-x-0" : " -translate-x-[100%]")
        }
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center text-[18px] font-medium leading-[22px] gap-5 capitalize">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                tabIndex={menuOpen ? 0 : -1}
                aria-label={link.name}
                className={
                  pathname == link.href ? " isActive" : "hover:opacity-70"
                }
                href={link.href}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div></div>
    </header>
  );
};
export default Header;
