import money from "@/../public/money_bag.png"
import wallet from "@/../public/wallet.png"
import bank from "@/../public/bank.png"
import stocks from "@/../public/stock.png"
import { StaticImageData } from "next/image";

export interface ServiceCard {
  title: string;
  services: string[];
  buttonText: string;
  href:string;
}

export const serviceCards: ServiceCard[] = [
  {
    title: "Airtime Top up",
    services: ["MTN VTU", "GLO VTU", "AIRTEL VTU", "9MOBILE VTU"],
    buttonText: "See more",
    href:"/dashboard?tab=services&section=airtime"
  },
  {
    title: "Data Top up",
    services: ["MTN DATA", "GLO DATA", "AIRTEL DATA", "9MOBILE DATA"],
    buttonText: "See more",
    href:"/dashboard?tab=services&section=data"
  },
  {
    title: "Cable Subscription",
    services: ["GOTV", "DSTV", "Startimes"],
    buttonText: "See more",
    href:"/dashboard?tab=services&section=subscription"
  },
  {
    title: "Electricity Bill",
    services: ["PHED, AEDC", "IKEDC, EKEDC", "KEDCO, IBEDC", "JED plc, KAEDCO"],
    buttonText: "See more",
    href:"/dashboard?tab=services&section=bill"
  },
  {
    title: "Exams Pins",
    services: ["WAEC", "NECO", "JAMB", "Pins Instantly"],
    buttonText: "See more",
    href:"/dashboard?tab=services&section=card"
  },
];
export interface AgentCardType {
  title: string;
  description: string;
  icon: StaticImageData;
}

export const agentCards: AgentCardType[] = [
  {
    title: "Earn Substantial Commissions",
    description: "Receive highly competitive commissions for each transaction you facilitate on behalf of our customers",
    icon: money,
  },
  {
    title: "Instant Withdrawal",
    description: "Access your earnings immediately with seamless transfers to your wallet or bank account, no hassles.s",
    icon: bank,
  },
  {
    title: "Business Growth",
    description: "Access curated digital tools designed to accelerate your growth",
    icon: stocks,
  },
  {
    title: "Automatic Wallet Funding",
    description: "Experience instant and secure wallet top-ups, enabling fast transactions exactly when you need them",
    icon: wallet,
  }
];
