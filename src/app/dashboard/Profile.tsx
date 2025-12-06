"use client";
import { selectOption } from "@/app/util/functions";
import { Mail, Phone, UserPen, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuthUser } from "../customHooks/UseQueries";
const Profile = () => {
  const { data: user, isLoading, isError, error } = useAuthUser();
  const [profileForm, setPasswordForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
  });
  const [resetForm, setResetForm] = useState({
    old_password: "",
    new_password: "",
    email: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [canDelete, setCanDelete] = useState(false);
  const [buttonText, setButtonText] = useState("Update Profile");
  useEffect(() => {
    if (user && user != undefined)
      setPasswordForm({
        first_name: user?.fullName.split("_")[0],
        last_name: user?.fullName.split("_")[1],
        phone: user?.phoneNumber,
        email: user?.email,
      });
  }, [user]);
  return (
    <>
      <div className={"w-[80%] mx-auto " + (canDelete && "  blur-md")}>
        {" "}
        <h1 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3 text-darkbackground">
          Profile Settings
        </h1>
        <p className=" leading-6 text-sm text-[#727272] mb-7 max-sm:text-xs">
          Manage your account information
        </p>
        <div className="flex flex-col gap-10">
          {/* profile section */}
          <div className={isLoading ? " shimmer" : " "}>
            <div
              className={
                "flex gap-5 max-xs:flex-col  py-7 px-5 bg-[#AAAAAA0D] rounded-lg border-2 border-[#AAAAAACC] " +
                (isLoading && " hidden")
              }
            >
              <div
                className={
                  "rounded-full bg-[#4E61E51A] overflow-hidden max-w-[50px] max-h-[50px] max-xs:mx-auto "
                }
              >
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
                  {user?.fullName.split("_")[0]} {user?.fullName.split("_")[1]}
                </h1>
                <p className=" leading-6 font-bold text-sm max-sm:text-xs">
                  VTU {user?.role}
                </p>
                <div className="flex gap-1 md:items-end max-md:flex-col">
                  <p className="flex gap-1 leading-6 font-medium text-sm max-sm:text-xs truncate">
                    <Mail size={18} /> {user?.email}
                  </p>
                  <p className=" flex gap-1 leading-6 font-medium text-sm max-sm:text-xs truncate">
                    <Phone size={18} /> {user?.phoneNumber}
                  </p>
                </div>
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
                    disabled={isDisabled}
                    name="first_name"
                    value={profileForm.first_name}
                    onChange={(e) => selectOption(e, setPasswordForm)}
                    type="text"
                    className={
                      " outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                      (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                    }
                    placeholder="Enter first name"
                  />
                </div>
                <div className="flex flex-col max-lg:mb-2 mt-2">
                  <p className="mb-2 text-darkbackground font-medium text-lg">
                    Email Address
                  </p>
                  <input
                    disabled={isDisabled}
                    name="email"
                    value={profileForm.email}
                    onChange={(e) => selectOption(e, setPasswordForm)}
                    type="email"
                    className={
                      "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                      (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                    }
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="w-full ">
                <div className="flex flex-col">
                  <p className="mb-2 text-darkbackground font-medium text-lg">
                    Last Name
                  </p>
                  <input
                    disabled={isDisabled}
                    name="last_name"
                    value={profileForm.last_name}
                    onChange={(e) => selectOption(e, setPasswordForm)}
                    type="text"
                    className={
                      "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                      (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                    }
                    placeholder="Enter last name"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <p className="mb-2 text-darkbackground font-medium text-lg">
                    Phone Number
                  </p>
                  <input
                    disabled={isDisabled}
                    name="phone"
                    value={profileForm.phone}
                    onChange={(e) => selectOption(e, setPasswordForm)}
                    type="tel"
                    className={
                      "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                      (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
                    }
                    placeholder="Enter phone"
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col col-span-2">
            <p className="mb-2 text-darkbackground font-medium text-lg">
              Business Address
            </p>
            <input
              name="address"
              value={profileForm.title}
              onChange={(e) => selectOption(e, setPasswordForm)}
              type="text"
              className={
                " outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl " +
                (isDisabled ? " bg-[#8080801A]" : " bg-[#FFFFFF3B]/23")
              }
              placeholder="Title"
            />
          </div> */}
            <button
              onClick={() => {
                setIsDisabled(false);
                setButtonText("Submit");
              }}
              type="button"
              className="flex justify-center items-center gap-2 bg-[#646FC6] w-fit text-[#ffff] mt-7 py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#646fc6]/90 "
            >
              <div
                className={
                  "flex absolute justify-center" + (!false && " hidden")
                }
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              {buttonText}
            </button>
          </div>
          {/* reset password */}
          <div className="flex flex-col gap-2 py-7 px-5 bg-[#FFFFFF] rounded-lg border-2 border-[#AAAAAACC]">
            <h2 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3 text-darkbackground">
              Reset Password
            </h2>
            <div className="flex flex-col max-lg:mb-2 ">
              <p className="mb-2 text-darkbackground font-medium text-lg">
                Email
              </p>
              <input
                name="email"
                value={resetForm.email}
                onChange={(e) => selectOption(e, setResetForm)}
                type="text"
                className={
                  " outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl bg-[#FFFFFF3B]/23"
                }
                placeholder="Title"
              />
            </div>
            <div className="flex flex-col max-lg:mb-2 mt-2">
              <p className="mb-2 text-darkbackground font-medium text-lg">
                New Password
              </p>
              <input
                name="new_password"
                value={resetForm.new_password}
                onChange={(e) => selectOption(e, setResetForm)}
                type="password"
                className={
                  "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl bg-[#FFFFFF3B]/23"
                }
                placeholder="Enter new password"
              />
            </div>
            <div className="flex flex-col max-lg:mb-2 mt-2">
              <p className="mb-2 text-darkbackground font-medium text-lg">
                Old Password
              </p>
              <input
                name="old_password"
                value={resetForm.old_password}
                onChange={(e) => selectOption(e, setResetForm)}
                type="password"
                className={
                  "outline-darkbackground border-2 border-[#AAAAAA] p-4 rounded-2xl bg-[#FFFFFF3B]/23"
                }
                placeholder="Enter old password"
              />
            </div>
            <button
              type="submit"
              className="flex justify-center items-center gap-2 bg-[#FF3B30] w-fit text-[#ffff] mt-7 py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#FF3B30]/90 "
            >
              <div
                className={
                  "flex absolute justify-center" + (!false && " hidden")
                }
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              submit
            </button>
          </div>
          {/* delete account */}
          <div className="relative flex flex-col gap-2 py-7 px-5 bg-[#FFFFFF] rounded-lg border-2 border-[#AAAAAACC]">
            <h2 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3 text-darkbackground">
              Delete Account
            </h2>

            <button
              onClick={() => setCanDelete(true)}
              type="submit"
              className="flex justify-center items-center gap-2 bg-[#FF3B30] w-fit text-[#ffff] mt-7 py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#FF3B30]/90 "
            >
              <div
                className={
                  "flex absolute justify-center" + (!false && " hidden")
                }
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              Delete
            </button>
          </div>
        </div>
      </div>
      {canDelete && (
        <div
          className={
            canDelete
              ? " bottom-0 flex justify-center items-center w-full absolute opacity-[100%] z-100 mx-auto "
              : " hidden"
          }
        >
          <div className="flex flex-col w-fit py-5 px-10 justify-center items-center bg-neutral-100  rounded-lg shadow-2xl">
            <button
              onClick={() => setCanDelete(false)}
              className="ml-auto bg-darkbackground p-1 rounded-sm text-white flex justify-center items-center mb-5"
            >
              <X width={20} height={20} />
            </button>
            <div className="flex flex-col gap-2 mb-2">
              <h3 className="text-xl font-semibold  tracking-[-0.5px] text-main-heading">
                Delete Artist
              </h3>
              <p className="">
                Type <strong>Delete</strong> to Continue
              </p>
              <input
                type="text"
                required={true}
                className="border-2 border-primary rounded-lg outline-none px-2"
                onChange={(e) => {
                  if (e.target.value.trim().toLocaleLowerCase() === "delete") {
                    // setCanDelete(true);
                  } else {
                    setCanDelete(true);
                  }
                }}
              />
            </div>
            <div>
              <button
                aria-label="confirm delete artist"
                disabled={canDelete}
                onClick={() => {
                  // handleSubmit(formData);
                }}
                className="flex justify-center items-center gap-2 bg-[#FF3B30] w-fit text-[#ffff] py-2 px-4 rounded-xl hover:cursor-pointer hover:bg-[#FF3B30]/90 "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
