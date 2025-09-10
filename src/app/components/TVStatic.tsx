'use client';

import { useEffect, useState } from 'react';

interface TVStaticProps {
  intensity?: number;
  flickerSpeed?: number;
  className?: string;
}

const TVStatic = ({
  intensity = 50,
  flickerSpeed = 60,
  className = '',
}: TVStaticProps) => {
  const [noise, setNoise] = useState<string>('');

  useEffect(() => {
    const generateNoise = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      const intensityValue = Math.floor((intensity / 100) * 255);
      
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * intensityValue);
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
      }
      
      ctx.putImageData(imageData, 0, 0);
      setNoise(canvas.toDataURL());
    };

    generateNoise();
    const interval = setInterval(generateNoise, flickerSpeed);
    return () => clearInterval(interval);
  }, [intensity, flickerSpeed]);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundImage: noise ? `url(${noise})` : undefined,
        backgroundSize: '200px 200px',
        backgroundRepeat: 'repeat',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }}
    />
  );
};

export default TVStatic;