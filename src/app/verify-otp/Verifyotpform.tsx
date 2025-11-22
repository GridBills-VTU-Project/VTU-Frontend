"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import lock from "@/../public/lock.png";
import { toast } from "react-toastify";
import UseAxios from "@/app/customHooks/UseAxios";
import { isAxiosError } from "axios";
import {
  formatTime,
  isValidPassword,
  selectOption,
} from "@/app/util/functions";
import { useForgotpasswordOtpMutation } from "@/app/customHooks/useMutation";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Verifyotpform() {
  const router = useRouter();
  const api = UseAxios();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    otp: ["", "", "", ""],
    password: "",
  });
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const OTP_EXPIRY_SECONDS = 60;
  const { mutateAsync, isPending } = useForgotpasswordOtpMutation();

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/[^0-9]/.test(value)) return; // only digits

    const newOtp = [...form.otp];
    newOtp[index] = value;
    setForm((prev) => ({ ...prev, otp: newOtp }));

    // move to next input
    if (value && index < form.otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !form.otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = form.otp.join("");
    console.log("OTP submitted:", finalOtp);
    if (finalOtp.length < 4) {
      toast.error("Incomplete otp.");
      return;
    } else if (isNaN(parseInt(finalOtp))) {
      toast.error("invalid otp");
      return;
    } else if (!form.password || !isValidPassword(form.password)) {
      toast.warn(
        "password must be at least 6 characters long, containing at least 1 upper case character, 1 special character and 1 number"
      );
    }
    try {
      await mutateAsync({
        email: email,
        otp: finalOtp,
        password: form.password,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        return;
      }
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("vtuResetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // optional: redirect back if there's no stored email
      toast.error("No stored email");
      router.back();
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
      <div className="flex flex-col gap-3">
        <div className="flex gap-15">
          {form.otp.map((digit, index) => (
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
        <div className=" bg-white border-3 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] rounded-lg flex justify-between gap-5">
          <input
            required={true}
            name="password"
            value={form.password}
            onChange={(e) => selectOption(e, setForm)}
            type={open ? "text" : "password"}
            className="outline-0 w-full p-5 truncate"
            placeholder="Enter your new password"
          />
          {open ? (
            <button
              className="mr-5"
              type="button"
              onClick={() => setOpen(false)}
            >
              <Eye />
            </button>
          ) : (
            <button
              className="mr-5"
              type="button"
              onClick={() => setOpen(true)}
            >
              <EyeClosed />
            </button>
          )}
        </div>
      </div>
      <p>
        Didn&apos;t receive the otp?
        <button
          disabled={canResend ? false : true}
          onClick={handleResend}
          className="underline text-blue-600 hover:cursor-pointer hover:text-blue-600/80"
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
