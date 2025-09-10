'use client'

import Image from "next/image";
import { GrFormNext } from "react-icons/gr";
import pfp from '../../../public/pfp.png';
import Link from "next/link";
import { useState } from "react";
import QuestionTerminal from "./QuestionTerminal";

export default function HomePage() {
  const [openTerminal, setOpenTerminal] = useState(false);

  return (
    <div className="font-sans grid content-center min-h-screen p-8 sm:p-20 overflow-hidden">  
      {openTerminal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"></div>
          <QuestionTerminal setOpenTerminal={setOpenTerminal} />
        </>
      )}

      <main className="relative flex flex-col space-y-4 row-start-2 items-center">
        <div className="w-10 h-10">
          <Image src={pfp} className="object-cover w-full h-full" alt="profile picture" />
        </div>
        <div onClick={() => setOpenTerminal(true)} className="relative flex gap-4 items-center rounded-full border-2 border-solid border-white/40 bg-[#f2f2f2] transition-colors h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[320px]">
          <div className="">*****</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 transform p-1 border-2 border-solid border-black/40 flex items-center rounded-full">
            <button onClick={() => setOpenTerminal(false)} className="text-black"><GrFormNext /></button>
          </div>

          <div className="absolute right-2 top-14 text-right text-xs underline">
            <Link href="/recovery" className="">Recovery password</Link>
          </div>
        </div>
      </main>
    </div>
  );
}