import { AgentCardType, ServiceCard } from "@/app/constants/cardConstants";
import Image from "next/image";
import Link from "next/link";

export const Card = (props: ServiceCard) => {
  return (
    <div className="w-[200px] py-12 text-[#163145] border-3 border-[#AAAAAA] rounded-xl text-center relative inset-shadow-sm inset-shadow-[#00000040]">
      <h3 className="font-extrabold text-lg mb-3">{props.title}</h3>
      <ul className="text-sm font-medium flex flex-col gap-2">
        {props.services.map((_, index) => (
          <li key={index}>{_}</li>
        ))}
      </ul>
      <Link href={props.href} className="bg-darkbackground text-[#ffffff] py-2 text-lg font-medium rounded-xl px-3 absolute left-[24.5%] hover:cursor-pointer hover:bg-darkbackground/80 -bottom-5">
        See more
      </Link>
    </div>
  );
};


export const AgentCard = (props: AgentCardType) => {
  return (
    <div className="w-[500px] px-5 py-16 text-[#163145] border-3 border-[#AAAAAA] rounded-xl inset-shadow-sm inset-shadow-[#00000040] bg-[#FFFFFF]">
      <div className="bg-[#7AF57433] rounded-full w-15 p-2 flex justify-center mb-3">
        <Image
          src={props.icon}
          width={30}
          height={30}
          alt="just a normal icon"
          className="rounded-full w-10"
        />
      </div>
      <h3 className="font-extrabold text-lg">{props.title}</h3>
      <p className="text-sm font-medium text-[#727272]">
        {props.description}
      </p>
    </div>
  );
};
