'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  progress: number;
  mousePosition: { x: number; y: number };
}

// 9 Keyframe waypoints corresponding to the 9 phases
const WAYPOINTS = [
  { p: 0.00, pos: [0, 0, 8.8],        target: [0, 0, 0] },         // Phase 01: Intro
  { p: 0.11, pos: [0, 0.2, 7.4],      target: [0, 0, 0] },         // Phase 02: Activation
  { p: 0.22, pos: [-1.4, 0.35, 5.8],  target: [-0.9, 0.25, 0] },   // Phase 03: Messenger
  { p: 0.33, pos: [0.8, -0.15, 5.4],  target: [0, 0, 0] },         // Phase 04: AI Analysis
  { p: 0.44, pos: [1.5, 0.45, 5.8],   target: [1.0, 0.3, 0] },     // Phase 05: Customer
  { p: 0.55, pos: [-1.3, -0.55, 5.6], target: [-0.9, -0.4, 0] },   // Phase 06: Product
  { p: 0.66, pos: [1.3, -0.55, 5.6],  target: [0.9, -0.4, 0] },    // Phase 07: Order
  { p: 0.77, pos: [0, 0.6, 10.2],     target: [0, 0, 0] },         // Phase 08: Unified Engine
  { p: 0.88, pos: [0, 0, 12.8],       target: [0, 0, 0] },         // Phase 09: Transition
  { p: 1.00, pos: [0, 0, 14.5],       target: [0, 0, 0] },         // Final release
];

export const CameraRig: React.FC<CameraRigProps> = ({ progress, mousePosition }) => {
  const { camera } = useThree();
  const currentTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    // 1. Determine interpolated waypoint based on progress
    const clampedProgress = Math.min(1, Math.max(0, progress));

    let startIndex = 0;
    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      if (clampedProgress >= WAYPOINTS[i].p && clampedProgress <= WAYPOINTS[i + 1].p) {
        startIndex = i;
        break;
      }
    }

    const start = WAYPOINTS[startIndex];
    const end = WAYPOINTS[Math.min(startIndex + 1, WAYPOINTS.length - 1)];
    const segmentSpan = Math.max(0.0001, end.p - start.p);
    const localT = Math.min(1, Math.max(0, (clampedProgress - start.p) / segmentSpan));
    // Smooth cubic easing for camera interpolation
    const easeT = localT * localT * (3 - 2 * localT);

    const targetPosX = start.pos[0] + (end.pos[0] - start.pos[0]) * easeT;
    const targetPosY = start.pos[1] + (end.pos[1] - start.pos[1]) * easeT;
    const targetPosZ = start.pos[2] + (end.pos[2] - start.pos[2]) * easeT;

    const targetLookX = start.target[0] + (end.target[0] - start.target[0]) * easeT;
    const targetLookY = start.target[1] + (end.target[1] - start.target[1]) * easeT;
    const targetLookZ = start.target[2] + (end.target[2] - start.target[2]) * easeT;

    // 2. Add subtle mouse parallax offset
    const mouseOffsetX = mousePosition.x * 0.35;
    const mouseOffsetY = mousePosition.y * 0.25;

    const finalCamPos = new THREE.Vector3(
      targetPosX + mouseOffsetX,
      targetPosY + mouseOffsetY,
      targetPosZ
    );

    const finalTarget = new THREE.Vector3(
      targetLookX + mouseOffsetX * 0.2,
      targetLookY + mouseOffsetY * 0.2,
      targetLookZ
    );

    // Smooth lerp (no snapping)
    const lerpSpeed = Math.min(1, delta * 3.5);
    camera.position.lerp(finalCamPos, lerpSpeed);
    currentTargetRef.current.lerp(finalTarget, lerpSpeed);
    camera.lookAt(currentTargetRef.current);
  });

  return null;
};
