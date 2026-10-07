'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataParticlesProps {
  progress: number;
  isDark: boolean;
}

export const DataParticles: React.FC<DataParticlesProps> = ({ progress, isDark }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const streamPointsRef = useRef<THREE.Points>(null);

  // 1. Ambient Floating Cloud Particles
  const ambientCount = 350;
  const [ambientPositions, ambientSpeeds] = useMemo(() => {
    const pos = new Float32Array(ambientCount * 3);
    const speeds = new Float32Array(ambientCount);
    for (let i = 0; i < ambientCount; i++) {
      const radius = 2 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);

      speeds[i] = 0.2 + Math.random() * 0.8;
    }
    return [pos, speeds];
  }, []);

  // 2. Active Flowing Data Streams (Particles that stream in Phase 03 - 08)
  const streamCount = 180;
  const streamData = useMemo(() => {
    const pos = new Float32Array(streamCount * 3);
    const params = [];
    for (let i = 0; i < streamCount; i++) {
      const t = Math.random();
      // Target cluster: 0 = Messenger, 1 = Customer, 2 = Product, 3 = Order
      const cluster = i % 4;
      params.push({ t, speed: 0.15 + Math.random() * 0.35, cluster });
    }
    return { pos, params };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Ambient particles gentle drift
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.04;
      pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.05;
    }

    // Stream particles: travel between external nodes and AI Core
    if (streamPointsRef.current) {
      const positions = streamPointsRef.current.geometry.attributes.position.array as Float32Array;
      const nodeTargets = [
        new THREE.Vector3(-2.2, 0.5, 0),  // Messenger Node
        new THREE.Vector3(2.2, 0.7, 0),   // Customer Node
        new THREE.Vector3(-2.0, -1.0, 0), // Product Node
        new THREE.Vector3(1.8, -1.1, 0),  // Order Node
      ];
      const center = new THREE.Vector3(0, 0, 0);

      const activeFactor = Math.min(1, Math.max(0, (progress - 0.15) / 0.2));

      for (let i = 0; i < streamCount; i++) {
        const item = streamData.params[i];
        item.t = (item.t + delta * item.speed * (0.8 + progress * 2)) % 1;

        const target = nodeTargets[item.cluster];
        // Interpolate along curved arc between target node and center AI core
        const currentPos = new THREE.Vector3().lerpVectors(target, center, item.t);
        // Add curve height
        currentPos.y += Math.sin(item.t * Math.PI) * 0.4;
        currentPos.x += Math.sin(item.t * Math.PI * 2) * 0.15;

        positions[i * 3] = currentPos.x * activeFactor;
        positions[i * 3 + 1] = currentPos.y * activeFactor;
        positions[i * 3 + 2] = currentPos.z * activeFactor;
      }
      streamPointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particleColor = isDark ? '#93c5fd' : '#2563eb';
  const streamColor = isDark ? '#60a5fa' : '#3b82f6';

  return (
    <group>
      {/* Ambient Particle System */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ambientPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={particleColor}
          transparent
          opacity={progress < 0.88 ? 0.6 : 0.25}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Directed High-Speed Data Streams */}
      <points ref={streamPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[streamData.pos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={streamColor}
          transparent
          opacity={progress > 0.18 ? 0.85 : 0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
