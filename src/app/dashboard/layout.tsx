"use client";
import {
  Gift,
  Handbag,
  Headset,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogOutMutation } from "../customHooks/useMutation";
import UseRole from "../customHooks/UseRole";
export const dashboardSidebarLinks = [
  {
    name: "dashboard",
    img: <LayoutDashboard />,
    href: "/dashboard",
    color: "bg-[#1601FF4D]",
  },
  {
    name: "wallet",
    img: <Wallet />,
    href: "/wallet",
    color: "bg-[#2EAF074D]",
  },
  {
    name: "services",
    img: <Handbag />,
    href: "/services",
    color: "bg-[#F761164D]",
  },
  {
    name: "reward",
    img: <Gift />,
    href: "/reward",
    color: "bg-[#1631454D]",
  },
  {
    name: "support",
    img: <Headset />,
    href: "/support",
    color: "bg-[#1631454D]",
  },
  {
    name: "profile",
    img: <User />,
    href: "/support",
    color: "bg-[#1631454D]",
  },
  // { name: "Exam Scratch card", img: card, href: "/buy-airtime",color:"bg-[#1631454D]" }
];
export const agentDashboardSidebarLinks = [
  {
    name: "dashboard",
    img: <LayoutDashboard />,
    href: "/dashboard",
    color: "bg-[#1601FF4D]",
  },
  {
    name: "sale",
    img: <ShoppingCart />,
    href: "/services",
    color: "bg-[#F761164D]",
  },
  {
    name: "commission",
    img: <TrendingUp />,
    href: "/reward",
    color: "bg-[#1631454D]",
  },
  {
    name: "wallet",
    img: <Wallet />,
    href: "/wallet",
    color: "bg-[#2EAF074D]",
  },
  {
    name: "support",
    img: <Headset />,
    href: "/support",
    color: "bg-[#1631454D]",
  },
  {
    name: "profile",
    img: <User />,
    href: "/support",
    color: "bg-[#1631454D]",
  },
  // { name: "Exam Scratch card", img: card, href: "/buy-airtime",color:"bg-[#1631454D]" }
];

const layout = ({ children }: { children: React.ReactNode }) => {
  const canView = UseRole(["agent"]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<string | null>(null);
  const { mutateAsync } = useLogOutMutation();

  const setActiveTab = (newTab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", newTab);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  useEffect(() => {
    const tab = searchParams.get("tab") ?? "dashboard";
    setTab(tab);
  }, [searchParams]);

  return (
    <section className="flex max-mobile:block bg-[#F2F2F7] w-full min-h-[85dvh] ">
      <div className="flex justify-center w-full max-w-[160px] min-h-full bg-darkbackground flex-1">
        <div
          className={
            "flex items-center flex-col h-fit duration-500 not-mobile:hidden"
          }
        >
          <div className="text-white font-medium text-xs leading-[22px] mt-10 flex flex-col gap-10">
            {(canView ? agentDashboardSidebarLinks : dashboardSidebarLinks).map(
              (link) => (
                <button
                  onClick={() => setActiveTab(link.name)}
                  key={link.name}
                  className={
                    "text-center flex items-center capitalize gap-5 border-y-2 py-2 px-5 border-[#029993CC] " +
                    (link.name === tab && " bg-[#26798C]")
                  }
                >
                  <div>{link.img}</div>
                  {link.name}
                </button>
              )
            )}
            <button
              onClick={async () => await mutateAsync()}
              className={
                "text-center flex items-center capitalize gap-5 border-y-2 py-2 px-5 border-[#029993CC] "
              }
            >
              <div>
                <LogOut />
              </div>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="md:max-w-[90%] mx-auto flex-2">{children}</div>
    </section>
  );
};

export default layout;
