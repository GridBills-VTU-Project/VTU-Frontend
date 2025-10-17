// app/verify/page.tsx
import OtpInput from "@/app/components/otp/OtpInput";
import Image from "next/image";
import bg from "@/../public/otpbgimage.png";

export default function VerifyPage() {
  return (
    <main className="min-h-[85dvh] flex items-center justify-center bg-[#E3F3F6] relative w-full overflow-hidden">
      <Image
        src={bg}
        width={1200}
        height={700}
        alt={"image signifying two factor authenication"}
        className="absolute left-[74%] w-[400px] max-mobile:hidden"
      />
      <div className="w-[80%] max-xs:w-full max-xs:px-5">
        <OtpInput />
      </div>
    </main>
  );
}
