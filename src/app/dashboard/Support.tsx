"use client";
import { selectOption } from "@/app/util/functions";
import React, { useState } from "react";

const Support = () => {
  const [supportForm, setSupportForm] = useState({
    title: "",
    message: "",
  });
  return (
    <div>
      {" "}
      <h1 className=" max-xs:text-2xl text-3xl font-black not-xl:text-2xl leading-6 mb-3">
        Support
      </h1>
      <p className=" leading-6 text-sm text-[#727272] mb-7 max-sm:text-xs">
        Fill in your complains
      </p>
      <form
        action=""
        className="flex flex-col max-w-[700px] py-7 px-5 bg-[##AAAAAA0D] rounded-lg border-2 border-[#AAAAAACC]"
      >
        <div className="flex flex-col pb-10">
          <p className="mb-2">Title</p>
          <input
            name="title"
            value={supportForm.title}
            onChange={(e) => selectOption(e, setSupportForm)}
            type="text"
            className="border-2 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-5 rounded-lg bg-[#FFFFFF3B]/23"
            placeholder="Title"
          />
        </div>
        <div className="flex flex-col">
          <p className="mb-2">Message</p>
          <textarea
            onChange={(e) =>
              setSupportForm((prev) => ({ ...prev, message: e.target.value }))
            }
            value={supportForm.message}
            name="message"
            className="border-2 border-[#AAAAAA] inset-shadow-sm inset-shadow-[#00000040] p-3 rounded-lg min-h-[150px]"
            placeholder="Your message"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-[#646FC6] w-[30%] text-[#ffff] mt-15 p-5 inset-shadow-sm inset-shadow-[#00000040] rounded-lg hover:cursor-pointer hover:bg-[#646fc6]/90 "
        >
          <div className={"flex justify-center" + (!true && " hidden")}>
            <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Support;
