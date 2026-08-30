// src/AnimatedBackground.js

import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const AnimatedVanta = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      THREE,
      backgroundColor: 0x2d2d2d,
      mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x9c1de5,
  spacing: 17.00,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="fixed top-0 left-0 w-full  min-h-[calc(100dvh)] z-[-1]" />;
};

export default AnimatedVanta;
