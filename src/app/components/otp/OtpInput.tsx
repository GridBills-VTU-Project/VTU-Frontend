"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import lock from "@/../public/lock.png";
import { toast } from "react-toastify";
import UseAxios from "@/app/customHooks/UseAxios";
import { isAxiosError } from "axios";
import { formatTime } from "@/app/util/functions";
import { useOtpMutation } from "@/app/customHooks/useMutation";

export default function OtpInput() {
  const api = UseAxios();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const OTP_EXPIRY_SECONDS = 60;
  const { mutate, isPending } = useOtpMutation();

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/[^0-9]/.test(value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");
    console.log("OTP submitted:", finalOtp);
    if (finalOtp.length < 4) {
      toast.error("Incomplete otp.");
      return;
    }
    try {
      mutate({ email: email, otp: finalOtp });
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("vtuPendingEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // optional: redirect back if there's no stored email
      toast.error("No stored email");
      window.location.href = "/signup";
    }
  }, []);

  useEffect(() => {
    const storedExpiry = localStorage.getItem("vtuotpExpiry");

    let expiryTime: number;
    if (storedExpiry) {
      expiryTime = parseInt(storedExpiry);
    } else {
      expiryTime = Date.now() + OTP_EXPIRY_SECONDS * 1000;
      localStorage.setItem("vtuotpExpiry", expiryTime.toString());
    }

    const interval = setInterval(() => {
      const secondsLeft = Math.max(
        0,
        Math.floor((expiryTime - Date.now()) / 1000)
      );
      setTimer(secondsLeft);
      console.log(secondsLeft);
      if (secondsLeft === 0) {
        setCanResend(true);
        clearInterval(interval);
      } else {
        setCanResend(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [canResend, timer]);

  const handleResend = async () => {
    try {
      setLoading(true);

      // console.log("clicked",canResend);
      const res = await api.put("auth/otp", JSON.stringify({ email }));
      const newExpiry = Date.now() + OTP_EXPIRY_SECONDS * 1000;
      localStorage.setItem("vtuotpExpiry", newExpiry.toString());
      setCanResend(false);
      setTimer(OTP_EXPIRY_SECONDS);
      toast.success(res.data.msg);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-[60%] mx-auto max-mobile:w-[80%] max-sm:w-full">
      <div className="bg-[#646FC6] p-3 rounded-full">
        <Image
          src={lock}
          width={30}
          height={30}
          alt="image of a padlock"
          className="w-5"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">OTP verification</h1>
      <p className="text-xs">
        We&apos;ve sent a 4 digit code to <strong>{email}</strong>
      </p>

      <div className="flex gap-15">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="bg-white w-12 h-12 text-center text-xl border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>
      <p>
        Didn&apos;t receive the otp?
        <button
          disabled={canResend ? false : true}
          onClick={handleResend}
          className={"underline text-blue-600 hover:cursor-pointer hover:text-blue-600/80" + (canResend && " text-blue-300")}
        >
          Resend
        </button>{" "}
        {formatTime(timer)}
      </p>

      <button
        disabled={loading || isPending}
        onClick={handleSubmit}
        className="flex justify-center items-center gap-2 bg-[#646FC6] w-full text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#646FC6]/80 transition hover:cursor-pointer"
      >
        {" "}
        <div
          className={
            "flex justify-center " + ((!loading || !isPending) && " hidden")
          }
        >
          <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        Submit
      </button>
      <p></p>
    </div>
  );
}
