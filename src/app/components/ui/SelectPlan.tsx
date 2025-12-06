"use client";
import { DataArray } from "@/app/util/types";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function SelectPlan({
  options,
  placeholder = "Select an option",
  selected,
  setSelected,
  name,
  loading
}: {
  name: string;
  options: any;
  placeholder?: string;
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
  loading:boolean;
}) {
  const [open, setOpen] = useState(false);
  const [opt, setopt] = useState(options);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const ref = useRef<HTMLDivElement>(null);
  

  const handleSelect = (option: any) => {
    console.log(option);
    setopt(option);
    console.log(name);

    setSelected((prev: any) => ({ ...prev, [name]: option }));
    setOpen(false);
  };

  // 🔹 Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //   🔹 Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < options.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : options.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(options[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
    }
  };
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = e.target.value.toLowerCase();
  //   setopt(
  //     options.filter((option) => option.toLocaleLowerCase().includes(query))
  //   );
  // };

  return (
    <div ref={ref} className="relative w-full text-[16px] sm:text-sm ">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={
          " px-3 w-full flex justify-between items-center hover:cursor-pointer line-clamp-1 truncate p-5 rounded-lg bg-[#EEEEEE] " +
          (selected
            ? ""
            : "text-gray-400 font-extralight font-(family-name:--font-figtree)")
        }
      >
        {opt.name || placeholder}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown options */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-200 ease-in-out overflow-y-auto max-h-39 text-sm max-xs:max-h-60">
          {!loading? options.map((option:any, index:number) => (
            <button
              type="button"
              key={index}
              onClick={() => handleSelect(option)}
              className={`flex gap-2 w-full text-left px-4 py-3 border-b-1 
                ${
                  index === highlightedIndex
                    ? "bg-[#163145]/70 text-white"
                    : selected.name == option.name
                    ? "bg-[#163145] text-white"
                    : "text-[#000]"
                } 
                hover:bg-[#163145]/70 hover:text-white`}
            >
              {/* <Image
                className="w-5 h-auto"
                priority={true}
                src={`/${option.toLowerCase()}.svg`}
                alt={`${option} icon`}
                width={0}
                height={0}
              /> */}
              <div key={index} className="flex justify-between w-full">

              <p>
                
                { options && option.name}
                </p>
              <p>
                { options && "N"+option.sellingPrice}
                </p>
              </div>
            </button>
          )) : <div
                className={
                  "flex justify-center"
                }
              >
                <div className="w-5 h-5 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>}
        </div>
      )}
    </div>
  );
}
