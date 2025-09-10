'use client'

import Image from "next/image";
import { GrFormNext } from "react-icons/gr";
import pfp from '../../../public/pfp.png';
import Link from "next/link";
import { useState } from "react";
import QuestionTerminal from "./QuestionTerminal";
import TVStatic from "./TVStatic";

export default function HomePage() {
  const [openTerminal, setOpenTerminal] = useState(false);

  return (
    <div className="font-sans grid content-center min-h-screen p-8 sm:p-20 overflow-hidden bg-black">  
      {openTerminal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"></div>
          <QuestionTerminal setOpenTerminal={setOpenTerminal} />
        </>
      )}

      <main className="relative flex flex-col space-y-4 row-start-2 items-center">
        <div className="w-10 h-10 z-20 bg-white rounded-full">
          <Image src={pfp} className="object-cover w-full h-full" alt="profile picture" />
        </div>
        <div onClick={() => setOpenTerminal(true)} className="relative flex gap-4 items-center h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[320px] rounded-full border-2 border-solid border-white/40 bg-[#f2f2f2] transition-colors">
          <div className="">••••••••</div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 transform p-1 border-2 border-solid border-black/40 flex items-center rounded-full">
            <button onClick={() => setOpenTerminal(false)} className="text-black"><GrFormNext /></button>
          </div>
        </div>
          {/*  <div className="text-xs underline text-white text-right">
        <Link href="/recovery" className="">Recovery password</Link>
        </div> */}
      </main>

      <TVStatic 
        intensity={40} 
        flickerSpeed={95}
        className="opacity-70"
      />
    </div>
  );
}