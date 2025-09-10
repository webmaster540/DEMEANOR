"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import uzilogo from '../../../public/uzi-logo.gif'

type SplashScreenProps = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      onFinish(); // Call the function to hide the splash screen
    }, 3000); // 3000ms = 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!showSplash) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <Image
        src={uzilogo}
        alt="Splash screen animation"
        className="w-40 h-40"
        unoptimized={true} // Crucial for GIFs
      />
    </div>
  );
}
