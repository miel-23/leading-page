'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Order3DNodeProps {
  progress: number;
  isDark: boolean;
}

export const Order3DNode: React.FC<Order3DNodeProps> = ({ progress, isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Active in Phase 07 - 08 (0.62 to 0.92)
  const isVisible = progress >= 0.62 && progress <= 0.92;
  const emergence = Math.min(1, Math.max(0, (progress - 0.62) / 0.08));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current && isVisible) {
      groupRef.current.position.y = -1.0 + Math.sin(time * 1.5 + 3) * 0.07;
      groupRef.current.rotation.y = -Math.sin(time * 0.7) * 0.05 - 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 1.8;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={[2.1, -1.0, 0.2]} scale={emergence}>
      {/* 3D Order Confirmation Ring */}
      <mesh ref={ringRef} position={[0.1, 0, 0]}>
        <torusGeometry args={[0.17, 0.02, 16, 32]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* 3D Order Card */}
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
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-bold tracking-wider uppercase text-sky-400">
                AUTONOMOUS ORDER SETTLED
              </span>
            </div>
            <span className="text-emerald-400 font-bold">SUCCESS</span>
          </div>

          <div className="mt-2.5 space-y-2">
            <div className="p-2 rounded bg-white/[0.04] border border-white/[0.06] text-xs">
              <div className="flex justify-between items-center text-[10px] font-mono-code text-neutral-400">
                <span>RESERVATION #AH-9204</span>
                <span>TONIGHT · 8:30 PM</span>
              </div>
              <div className="font-semibold text-xs mt-1">4 Guests · Cellar Pairing Included</div>
            </div>

            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-sky-500/10 border border-sky-500/20 text-[10px] font-mono-code">
              <span className="text-sky-300">STRIPE HOLD</span>
              <span className="text-white font-bold">$120.00 DEPOSIT HELD</span>
            </div>

            <div className="text-[9px] font-mono-code text-neutral-400 text-center">
              Calendar & Table Management Dispatched
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
