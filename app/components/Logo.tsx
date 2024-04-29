import { CircleDollarSignIcon, PiggyBank } from "lucide-react";
import React from "react";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <CircleDollarSignIcon className="stroke h-11 w-11 stroke-emerald-500 stroke-[1.5]" />
      <p
        className="bg-gradient-to-r from-emerald-400 to-green-500 
        bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent cursor-default select-none"
      >
        Budgety
      </p>
    </div>
  );
}

export function LogoText() {
    return (
      <div className="flex items-center gap-2">
        <p
          className="bg-gradient-to-r from-emerald-400 to-green-500 
          bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent cursor-default select-none"
        >
          Budgety
        </p>
      </div>
    );
  }

export default Logo;
