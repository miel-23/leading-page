'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NetworkConnectionsProps {
  progress: number;
  isDark: boolean;
}

export const NetworkConnections: React.FC<NetworkConnectionsProps> = ({ progress, isDark }) => {
  const lineGroupRef = useRef<THREE.Group>(null);

  // Active in Phase 04 - 08 (0.30 onwards)
  const isVisible = progress >= 0.28 && progress <= 0.94;
  const emergence = Math.min(1, Math.max(0, (progress - 0.28) / 0.12));

  // Define nodes
  const nodes = useMemo(() => ({
    center: new THREE.Vector3(0, 0, 0),
    messenger: new THREE.Vector3(-2.4, 0.5, 0.2),
    customer: new THREE.Vector3(2.4, 0.6, 0.2),
    product: new THREE.Vector3(-2.1, -1.0, 0.2),
    order: new THREE.Vector3(2.1, -1.0, 0.2),
  }), []);

  // Compute curved paths between nodes
  const curves = useMemo(() => {
    const list: THREE.CatmullRomCurve3[] = [];

    // Core connections
    list.push(new THREE.CatmullRomCurve3([nodes.messenger, new THREE.Vector3(-1.2, 0.6, 0.4), nodes.center]));
    list.push(new THREE.CatmullRomCurve3([nodes.center, new THREE.Vector3(1.2, 0.7, 0.4), nodes.customer]));
    list.push(new THREE.CatmullRomCurve3([nodes.center, new THREE.Vector3(-1.0, -0.6, 0.3), nodes.product]));
    list.push(new THREE.CatmullRomCurve3([nodes.center, new THREE.Vector3(1.0, -0.6, 0.3), nodes.order]));

    // Inter-node ring connections (Phase 08 full mesh)
    list.push(new THREE.CatmullRomCurve3([nodes.messenger, new THREE.Vector3(-2.5, -0.2, 0.5), nodes.product]));
    list.push(new THREE.CatmullRomCurve3([nodes.product, new THREE.Vector3(0, -1.4, 0.4), nodes.order]));
    list.push(new THREE.CatmullRomCurve3([nodes.order, new THREE.Vector3(2.5, -0.2, 0.5), nodes.customer]));
    list.push(new THREE.CatmullRomCurve3([nodes.customer, new THREE.Vector3(0, 1.2, 0.5), nodes.messenger]));

    return list;
  }, [nodes]);

  const tubeGeometries = useMemo(() => {
    return curves.map((curve) => new THREE.TubeGeometry(curve, 32, 0.015, 8, false));
  }, [curves]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lineGroupRef.current) {
      // Subtle organic breath in lines
      const s = 1 + Math.sin(time * 2) * 0.01;
      lineGroupRef.current.scale.set(s, s, s);
    }
  });

  if (!isVisible) return null;

  const lineColor = isDark ? '#60a5fa' : '#2563eb';
  const fullMeshOpacity = progress > 0.72 ? 0.85 : progress > 0.35 ? 0.4 : 0.15;

  return (
    <group ref={lineGroupRef} scale={emergence}>
      {tubeGeometries.map((geom, idx) => {
        // First 4 are direct core lines (visible early), next 4 are ring lines (visible mostly in Phase 08)
        const isRing = idx >= 4;
        const opacity = isRing ? (progress > 0.7 ? fullMeshOpacity : 0.08) : fullMeshOpacity;

        return (
          <mesh key={idx} geometry={geom}>
            <meshBasicMaterial
              color={lineColor}
              transparent
              opacity={opacity * emergence}
              wireframe={false}
            />
          </mesh>
        );
      })}
    </group>
  );
};
