'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Product3DNodeProps {
  progress: number;
  isDark: boolean;
}

export const Product3DNode: React.FC<Product3DNodeProps> = ({ progress, isDark }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cubeRef = useRef<THREE.Mesh>(null);

  // Active in Phase 06 - 08 (0.50 to 0.92)
  const isVisible = progress >= 0.50 && progress <= 0.92;
  const emergence = Math.min(1, Math.max(0, (progress - 0.50) / 0.08));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current && isVisible) {
      groupRef.current.position.y = -1.0 + Math.sin(time * 1.4 + 2) * 0.07;
      groupRef.current.rotation.y = Math.sin(time * 0.6) * 0.05 + 0.1;
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.8;
      cubeRef.current.rotation.y = time * 1.1;
    }
  });

  if (!isVisible) return null;

  return (
    <group ref={groupRef} position={[-2.1, -1.0, 0.2]} scale={emergence}>
      {/* 3D Geometric Product Token */}
      <mesh ref={cubeRef} position={[-0.1, 0, 0]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          emissive="#2563eb"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* 3D Product & Inventory Card */}
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
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[9px] font-mono-code">
            <span className="font-bold tracking-wider uppercase text-blue-400">
              PRODUCT & INVENTORY MATCH
            </span>
            <span className="text-emerald-400 font-semibold">IN STOCK</span>
          </div>

          <div className="mt-2.5 space-y-2">
            <div>
              <div className="text-xs font-semibold">Reserve Cellar Selection #84</div>
              <div className="text-[10px] text-neutral-400 font-mono-code mt-0.5">
                SKU: AH-CELLAR-84 · 18 Bottles Available
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono-code">
              <span className="text-neutral-400">UNIT PRICE</span>
              <span className="text-white font-bold">$120.00 USD</span>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] font-mono-code text-blue-300">
              <span className="h-1 w-1 rounded-full bg-blue-400" />
              <span>Catalog synchronized with real-time POS</span>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};
