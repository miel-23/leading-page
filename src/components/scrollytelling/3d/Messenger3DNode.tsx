'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Messenger3DNodeProps {
  progress: number;
  isDark: boolean;
}

export const Messenger3DNode: React.FC<Messenger3DNodeProps> = ({ progress, isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.Mesh>(null);

  // Active in Phase 03 - 08 (0.20 to 0.90)
  const isVisible = progress >= 0.18 && progress <= 0.92;
  const emergence = Math.min(1, Math.max(0, (progress - 0.18) / 0.08));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current && isVisible) {
      // Subtle hovering in space
      groupRef.current.position.y = 0.5 + Math.sin(time * 1.5) * 0.08;
      groupRef.current.rotation.y = Math.sin(time * 0.8) * 0.05 + 0.15;
    }

    if (beaconRef.current) {
      beaconRef.current.rotation.z = time * 2;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={[-2.4, 0.5, 0.2]} scale={emergence}>
      {/* 3D Hologram Anchor Node */}
      <mesh ref={beaconRef}>
        <ringGeometry args={[0.15, 0.18, 32]} />
        <meshBasicMaterial color="#3b82f6" side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>

      {/* 3D Projected Holographic Dialogue Card */}
      <Html
        transform
        distanceFactor={6.5}
        position={[0, 0.1, 0]}
        className="pointer-events-none select-none"
      >
        <div className={`w-72 rounded-xl p-3.5 backdrop-blur-xl border shadow-2xl transition-colors ${
          isDark
            ? 'bg-[#0d1117]/85 border-blue-500/30 text-white shadow-blue-950/40'
            : 'bg-white/90 border-blue-600/30 text-neutral-900 shadow-neutral-400/30'
        }`}>
          {/* Header Status */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] font-mono-code">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="font-bold tracking-wider uppercase text-blue-400">
                MESSENGER INGESTION
              </span>
            </div>
            <span className="text-neutral-400">LIVE · 0.8ms</span>
          </div>

          {/* Incoming message stream */}
          <div className="space-y-2 mt-2.5">
            <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs">
              <div className="text-[9px] font-mono-code text-neutral-400 uppercase tracking-wider mb-0.5">
                Incoming Stream (WhatsApp Business)
              </div>
              <p className="text-xs font-medium leading-relaxed">
                « Can I book a table for 4 tonight at 8:30 PM with the cellar tasting? »
              </p>
            </div>

            {/* AI processing telemetry */}
            <div className="flex items-center justify-between px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono-code text-blue-300">
              <span>AI RECOGNITION</span>
              <span className="font-semibold text-blue-400">99.8% CONFIDENCE</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
