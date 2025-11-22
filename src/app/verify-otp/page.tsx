import Image from "next/image";
import bg from "@/../public/otpbgimage.png";
import Verifyotpform from "./Verifyotpform";

export default function VerifyPage() {
  return (
    <main className="min-h-[85dvh] flex items-center justify-center bg-[#E3F3F6] relative w-full overflow-hidden">
      <Image
        src={bg}
        width={1200}
        height={700}
        alt={"image signifying two factor authenication"}
        className="absolute right-[1%] w-[400px] max-[1200px]:hidden"
      />
      <div className="w-[80%] max-xs:w-full max-xs:px-5">
        <Verifyotpform/>
      </div>
    </main>
  );
}