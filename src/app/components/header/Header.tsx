"use client";
import Image from "next/image";
import "./header.css";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { dashboardLinks, links } from "@/app/constants/headerConstants";
import { UserPen } from "lucide-react";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string|null>(null);


  useEffect(() => {
    let isAuthenticated: string | null | boolean = null;
    isAuthenticated = localStorage.getItem("vtuAuthenticated");
    console.log(isAuthenticated);
    
    if (isAuthenticated) {
      if (Date.now() > parseInt(isAuthenticated)) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false)
    console.log(pathname);
    setTab(searchParams.get("tab"))
    
  },[searchParams])
console.log(tab);

  return (
    <header className="text-[#fff] not-italic bg-darkbackground z-50  h-[120px] flex">
      <div className="flex items-center justify-between not-italic mx-auto w-[90%]">
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
          <Link
            href={"/"}
            aria-label="Home"
            className="flex flex-col justify-start w-full"
          >
            <Image
              className="w-auto h-auto"
              src="/logo.png"
              alt="Grid Bills Logo"
              width={60}
              height={60}
              priority={true}
            />
            Grid Bills
          </Link>
        </div>
        {/* desktop nav */}
        {!pathname.startsWith("/dashboard") && (
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
        )}
        <ul className="flex items-center font-semibold text-xl leading-[22px] ml-4 gap-7 not-sm:text-[10px] not-sm:gap-3">
          {!pathname.startsWith("/dashboard") ? (
            isAuthenticated ? (
              <>
                <li>
                  <Link
                    href={"/dashboard?tab=dashboard"}
                    className="bg-[#fff] border-1 px-4 py-1 rounded-[8px] text-[#000000] hover:text-[#fff] hover:border-[#fff] hover:bg-transparent"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href={"/signin"}
                    className="border px-4 py-1 rounded-[8px] hover:bg-[#fff] hover:text-[#000000] hover:border-[#000000]"
                  >
                    log in
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/signup"}
                    className="bg-[#fff] border-1 px-4 py-1 rounded-[8px] text-[#000000] hover:text-[#fff] hover:border-[#fff] hover:bg-transparent"
                  >
                    sign up
                  </Link>
                </li>
              </>
            )
          ) : (
            <div className="p-5 rounded-full bg-[#4E61E51A]">
              <UserPen />
            </div>
          )}
        </ul>
      </div>

      {/* mobile nav */}
      <nav
        className={
          "mobile:hidden flex items-center gap-18 pt-10 flex-col bg-darkbackground h-[100dvh] min-w-[50%] not-sm:min-w-full absolute top-25 left-0 z-40 transition-all duration-500 " +
          (menuOpen ? " translate-x-0" : " -translate-x-[100%]")
        }
        aria-hidden={!menuOpen}
      >
        {pathname.startsWith("/dashboard") ? (
          <ul className="flex flex-col items-center text-[18px] font-medium leading-[22px] gap-5 capitalize w-full h-[50%]">
            {dashboardLinks.map((link) => (
              <li key={link.name} className={"p-4 w-full " + (tab && tab === link.name ? " bg-[#26798C]" : " hover:opacity-70")}>
                <Link
                  tabIndex={menuOpen ? 0 : -1}
                  aria-label={link.name}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
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
        )}
      </nav>
      <div></div>
    </header>
  );
};
export default Header;
