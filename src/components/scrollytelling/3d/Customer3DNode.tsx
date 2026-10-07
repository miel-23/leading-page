'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Customer3DNodeProps {
  progress: number;
  isDark: boolean;
}

export const Customer3DNode: React.FC<Customer3DNodeProps> = ({ progress, isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Active in Phase 05 - 08 (0.38 to 0.92)
  const isVisible = progress >= 0.38 && progress <= 0.92;
  const emergence = Math.min(1, Math.max(0, (progress - 0.38) / 0.08));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current && isVisible) {
      groupRef.current.position.y = 0.6 + Math.sin(time * 1.3 + 1) * 0.08;
      groupRef.current.rotation.y = -Math.sin(time * 0.7) * 0.05 - 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = time * 1.5;
      ringRef.current.rotation.y = time * 0.8;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={[2.4, 0.6, 0.2]} scale={emergence}>
      {/* 3D Anchor Rings */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.16, 0.02, 16, 32]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#0284c7" />
      </mesh>

      {/* 3D Customer Profile Card */}
      <Html
        transform
        distanceFactor={6.5}
        position={[0, 0.1, 0]}
        className="pointer-events-none select-none"
      >
        <div className={`w-72 rounded-xl p-3.5 backdrop-blur-xl border shadow-2xl transition-colors ${
          isDark
            ? 'bg-[#0d1117]/85 border-sky-500/30 text-white shadow-sky-950/40'
            : 'bg-white/90 border-sky-600/30 text-neutral-900 shadow-neutral-400/30'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] font-mono-code">
            <span className="font-bold tracking-wider uppercase text-sky-400">
              CUSTOMER PROFILE SYNTHESIS
            </span>
            <span className="text-neutral-400">ID #C-8921</span>
          </div>

          <div className="mt-2.5 space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-sky-500/20 border border-sky-400/30 flex items-center justify-center font-bold text-sky-400 text-xs">
                SC
              </div>
              <div>
                <div className="text-xs font-semibold">Sarah Chen</div>
                <div className="text-[10px] text-neutral-400 font-mono-code">
                  VIP Patron · Omnichannel Active
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1 text-[9px] font-mono-code">
              <div className="p-1.5 rounded bg-white/[0.04] border border-white/[0.06]">
                <div className="text-neutral-500 uppercase">Total Spend</div>
                <div className="text-white font-bold text-[10px] mt-0.5">$2,840.00</div>
              </div>
              <div className="p-1.5 rounded bg-white/[0.04] border border-white/[0.06]">
                <div className="text-neutral-500 uppercase">Intent Extracted</div>
                <div className="text-sky-400 font-bold text-[10px] mt-0.5">Booking + Tasting</div>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
