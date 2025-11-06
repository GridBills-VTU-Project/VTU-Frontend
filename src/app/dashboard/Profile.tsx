"use client";
import { selectOption } from "@/app/util/functions";
import { Mail, Phone, UserPen } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
const Profile = () => {
  const [supportForm, setSupportForm] = useState({
    title: "",
    message: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Update Profile");
  return (
    <div className="w-[80%] mx-auto">
      {" "}
      <h1 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3 text-darkbackground">
        Profile Settings
      </h1>
      <p className=" leading-6 text-sm text-[#727272] mb-7 max-sm:text-xs">
        Manage your account information
      </p>
      <div className="flex flex-col gap-10">
        {/* profile section */}
        <div className="flex gap-5 max-xs:flex-col  py-7 px-5 bg-[#AAAAAA0D] rounded-lg border-2 border-[#AAAAAACC]">
          <div className="rounded-full bg-[#4E61E51A] overflow-hidden max-w-[50px] max-h-[50px] max-xs:mx-auto">
            <Image
              src={"/profilepic.png"}
              alt="profile picture"
              width={80}
              height={90}
              className="object-cover "
            />
          </div>
          <div className="flex flex-col gap-1 text-[#727272]">
            <h1 className="capitalize max-xs:text-lg text-xl font-bold leading-6 text-darkbackground">
              John doe
            </h1>
            <p className=" leading-6 font-bold text-sm max-sm:text-xs">
              VTU Agent
            </p>
            <div className="flex gap-1 md:items-end max-md:flex-col">
              <p className="flex gap-1 leading-6 font-medium text-sm max-sm:text-xs truncate">
                <Mail size={18} /> John.snow@example.com
              </p>
              <p className=" flex gap-1 leading-6 font-medium text-sm max-sm:text-xs truncate">
                <Phone size={18} /> +234 801 234 5678
              </p>
            </div>
          </div>
        </div>
        {/* details */}
        <div className="flex flex-col gap-2 py-7 px-5 bg-[#FFFFFF] rounded-lg border-2 border-[#AAAAAACC]">
          <h2 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3 text-darkbackground">
            Personal Information
          </h2>
          <div className="flex gap-2 lg:gap-10 max-lg:flex-col ">
            <div className="w-full ">
              <div className="flex flex-col max-lg:mb-2 ">
                <p className="mb-2 text-darkbackground font-medium text-lg">
                  First Name
                </p>
                <input
                  name="first_name"
                  value={supportForm.title}
                  onChange={(e) => selectOption(e, setSupportForm)}
                  type="text"
                  className={
                    " outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                    (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                  }
                  placeholder="Title"
                />
              </div>
              <div className="flex flex-col max-lg:mb-2 mt-2">
                <p className="mb-2 text-darkbackground font-medium text-lg">
                  Email Address
                </p>
                <input
                  name="email"
                  value={supportForm.title}
                  onChange={(e) => selectOption(e, setSupportForm)}
                  type="email"
                  className={
                    "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                    (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                  }
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="w-full ">
              <div className="flex flex-col">
                <p className="mb-2 text-darkbackground font-medium text-lg">
                  Last Name
                </p>
                <input
                  name="last_name"
                  value={supportForm.title}
                  onChange={(e) => selectOption(e, setSupportForm)}
                  type="text"
                  className={
                    "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                    (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                  }
                  placeholder="Title"
                />
              </div>
              <div className="flex flex-col mt-2">
                <p className="mb-2 text-darkbackground font-medium text-lg">
                  Phone Number
                </p>
                <input
                  name="phone"
                  value={supportForm.title}
                  onChange={(e) => selectOption(e, setSupportForm)}
                  type="tel"
                  className={
                    "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                    (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                  }
                  placeholder="Title"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col col-span-2">
            <p className="mb-2 text-darkbackground font-medium text-lg">
              Business Address
            </p>
            <input
              name="address"
              value={supportForm.title}
              onChange={(e) => selectOption(e, setSupportForm)}
              type="text"
              className={
                " outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
              }
              placeholder="Title"
            />
          </div>
          <button
            disabled={isDisabled}
            type="submit"
            className="flex justify-center items-center gap-2 bg-[#646FC6] w-fit text-[#ffff] mt-7 py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#646fc6]/90 "
          >
            <div
              className={"flex absolute justify-center" + (!true && " hidden")}
            >
              <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            {buttonText}
          </button>
        </div>
        {/* reset password */}
        <div className="flex flex-col gap-2 py-7 px-5 bg-[#FFFFFF] rounded-lg border-2 border-[#AAAAAACC]">
          <h2 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3 text-darkbackground">
            Personal Information
          </h2>
              <div className="flex flex-col max-lg:mb-2 ">
                <p className="mb-2 text-darkbackground font-medium text-lg">
                  First Name
                </p>
                <input
                  name="first_name"
                  value={supportForm.title}
                  onChange={(e) => selectOption(e, setSupportForm)}
                  type="text"
                  className={
                    " outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                    (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                  }
                  placeholder="Title"
                />
              </div>
              <div className="flex flex-col max-lg:mb-2 mt-2">
                <p className="mb-2 text-darkbackground font-medium text-lg">
                  Email Address
                </p>
                <input
                  name="email"
                  value={supportForm.title}
                  onChange={(e) => selectOption(e, setSupportForm)}
                  type="email"
                  className={
                    "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                    (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                  }
                  placeholder="Title"
                />
          </div>
              <div className="flex flex-col max-lg:mb-2 mt-2">
                <p className="mb-2 text-darkbackground font-medium text-lg">
                  Email Address
                </p>
                <input
                  name="email"
                  value={supportForm.title}
                  onChange={(e) => selectOption(e, setSupportForm)}
                  type="email"
                  className={
                    "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                    (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                  }
                  placeholder="Title"
                />
          </div>
          <button
            disabled={isDisabled}
            type="submit"
            className="flex justify-center items-center gap-2 bg-[#FF3B30] w-fit text-[#ffff] mt-7 py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#FF3B30]/90 "
          >
            <div
              className={"flex absolute justify-center" + (!true && " hidden")}
            >
              <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            {buttonText}
          </button>
        </div>
        {/* delete account */}
        <div className="flex flex-col gap-2 py-7 px-5 bg-[#FFFFFF] rounded-lg border-2 border-[#AAAAAACC]">
          <h2 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3 text-darkbackground">
            Personal Information
          </h2>
              
          <button
            disabled={isDisabled}
            type="submit"
            className="flex justify-center items-center gap-2 bg-[#FF3B30] w-fit text-[#ffff] mt-7 py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#FF3B30]/90 "
          >
            <div
              className={"flex absolute justify-center" + (!true && " hidden")}
            >
              <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
