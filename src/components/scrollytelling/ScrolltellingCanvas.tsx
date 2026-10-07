'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AICore } from './3d/AICore';
import { DataParticles } from './3d/DataParticles';
import { Messenger3DNode } from './3d/Messenger3DNode';
import { Customer3DNode } from './3d/Customer3DNode';
import { Product3DNode } from './3d/Product3DNode';
import { Order3DNode } from './3d/Order3DNode';
import { NetworkConnections } from './3d/NetworkConnections';
import { CameraRig } from './3d/CameraRig';
import { ThemeMode } from '../../types';

interface ScrolltellingCanvasProps {
  progress: number;
  mousePosition: { x: number; y: number };
  theme: ThemeMode;
}

export const ScrolltellingCanvas: React.FC<ScrolltellingCanvasProps> = ({
  progress,
  mousePosition,
  theme,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
      <Canvas
        camera={{ position: [0, 0, 8.8], fov: 42, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.75]}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Subtle Ambient & Directional Lighting */}
          <ambientLight intensity={isDark ? 0.35 : 0.8} />
          
          <directionalLight
            position={[5, 8, 5]}
            intensity={isDark ? 1.2 : 1.6}
            color="#ffffff"
          />

          <directionalLight
            position={[-5, -4, -3]}
            intensity={isDark ? 0.6 : 0.4}
            color="#3b82f6"
          />

          {/* Camera Storytelling Controller */}
          <CameraRig progress={progress} mousePosition={mousePosition} />

          {/* 1. Central AI Core */}
          <AICore progress={progress} isDark={isDark} />

          {/* 2. Floating Ambient & Streaming Data Particles */}
          <DataParticles progress={progress} isDark={isDark} />

          {/* 3. Messenger Conversation Node (Phase 03) */}
          <Messenger3DNode progress={progress} isDark={isDark} />

          {/* 4. Customer Identity Node (Phase 05) */}
          <Customer3DNode progress={progress} isDark={isDark} />

          {/* 5. Product & Inventory Node (Phase 06) */}
          <Product3DNode progress={progress} isDark={isDark} />

          {/* 6. Autonomous Order Node (Phase 07) */}
          <Order3DNode progress={progress} isDark={isDark} />

          {/* 7. Neural Interconnection Lattice (Phase 04 - 08) */}
          <NetworkConnections progress={progress} isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
};
