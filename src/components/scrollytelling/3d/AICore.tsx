'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AICoreProps {
  progress: number;
  isDark: boolean;
}

export const AICore: React.FC<AICoreProps> = ({ progress, isDark }) => {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreIcosaRef = useRef<THREE.Mesh>(null);
  const coreWireRef = useRef<THREE.Mesh>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Rotation speed accelerates with activation (Phase 02 onwards, progress > 0.11)
    const activation = Math.min(1, Math.max(0, (progress - 0.08) / 0.15));
    const speedMultiplier = 0.5 + activation * 2.2 + (progress > 0.7 ? 1.5 : 0);

    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * 0.4 * speedMultiplier;
      outerRingRef.current.rotation.y = time * 0.6 * speedMultiplier;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -time * 0.7 * speedMultiplier;
      innerRingRef.current.rotation.z = time * 0.5 * speedMultiplier;
    }

    if (coreIcosaRef.current) {
      coreIcosaRef.current.rotation.y = time * 0.3 * speedMultiplier;
      coreIcosaRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      
      // Subtle organic breathing scale
      const breathe = 1 + Math.sin(time * 2.5) * 0.04 * (1 + activation);
      const baseScale = progress < 0.1 ? 0.9 : progress > 0.75 ? 1.35 : 1.1;
      coreIcosaRef.current.scale.setScalar(baseScale * breathe);
    }

    if (coreWireRef.current && coreIcosaRef.current) {
      coreWireRef.current.rotation.copy(coreIcosaRef.current.rotation);
      coreWireRef.current.scale.copy(coreIcosaRef.current.scale).multiplyScalar(1.03);
    }

    if (glowLightRef.current) {
      const pulseIntensity = 1.5 + Math.sin(time * 4) * 0.5 + activation * 3.5 + (progress > 0.75 ? 3.0 : 0);
      glowLightRef.current.intensity = pulseIntensity;
    }
  });

  const coreColor = isDark ? '#3b82f6' : '#2563eb';
  const wireColor = isDark ? '#60a5fa' : '#1d4ed8';
  const ringColor = isDark ? '#ffffff' : '#0f172a';

  return (
    <group position={[0, 0, 0]}>
      {/* Central Pulsing Point Light */}
      <pointLight
        ref={glowLightRef}
        color="#3b82f6"
        intensity={2}
        distance={15}
        decay={2}
      />

      {/* Solid Inner Faceted Core */}
      <mesh ref={coreIcosaRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={coreColor}
          emissive="#1e3a8a"
          emissiveIntensity={progress > 0.1 ? 0.7 : 0.2}
          roughness={0.2}
          metalness={0.85}
          wireframe={false}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Wireframe Shell around Core */}
      <mesh ref={coreWireRef}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial
          color={wireColor}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Outer Gyroscopic Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.5, 0.025, 16, 64]} />
        <meshStandardMaterial
          color={ringColor}
          metalness={0.9}
          roughness={0.1}
          emissive="#2563eb"
          emissiveIntensity={progress > 0.1 ? 0.4 : 0.05}
        />
      </mesh>

      {/* Inner Gyroscopic Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.25, 0.02, 16, 64]} />
        <meshStandardMaterial
          color={ringColor}
          metalness={0.9}
          roughness={0.15}
          emissive="#60a5fa"
          emissiveIntensity={progress > 0.1 ? 0.3 : 0.05}
        />
      </mesh>

      {/* Floating Orbital Nodelets */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        const radius = 1.9;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, Math.sin(angle) * 0.4, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#93c5fd" />
          </mesh>
        );
      })}
    </group>
  );
};
