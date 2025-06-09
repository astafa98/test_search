import searchicon from "../assets/searchicon.svg";
import crossicon from "../assets/crossicon.svg";
import type { UseFormRegister } from "react-hook-form";
import type { ISearchForm } from "../types";

export default function SearchInput({
  placeholder,
  register,
  watchQuery,
  reset,
}: {
  placeholder: string;
  register: UseFormRegister<ISearchForm>;
  watchQuery: string;
  reset: (values?: Partial<ISearchForm>) => void;
}) {
  return (
    <div className="  relative w-full max-w-full flex-1">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center h-12 text-[#9C9C9C] pointer-events-none  select-none">
        <img src={searchicon} alt="search" className="h-5 w-5" />
      </div>
      <input
        {...register("query", {
          required: true,
        })}
        type="text"
        className="h-12 w-full bg-[#EEEEEE] hover:bg-[#E6E6E6] rounded-[12px] cursor-pointer pl-8 pr-8 border-none text-base placeholder:text-[#9C9C9C] focus:outline-none font-sfpro flex items-center"
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 0,
          paddingBottom: 0,
        }}
        placeholder={placeholder}
      />
      {watchQuery && (
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center h-12 cursor-pointer select-none"
          onClick={() => reset({ query: "" })}
        >
          <img src={crossicon} alt="crossicon" className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
