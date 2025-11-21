'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import * as React from 'react';

type Rotatable = { rotation: { x: number; y: number } }; // minimal shape for animation

function TorusKnot() {
  const ref = React.useRef<Rotatable | null>(null);
  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }
    ref.current.rotation.x += 0.3 * delta;
    ref.current.rotation.y += 0.2 * delta;
  });
  return (
    <mesh ref={ref} scale={1.2} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.35, 180, 32, 2, 3]} />
      {
        (
          <meshStandardMaterial
            color={'#00ffd0'}
            metalness={0.2}
            roughness={0.25}
            emissive={'#6a00ff'}
            emissiveIntensity={0.15}
          />
        ) as unknown as React.ReactElement
      }
    </mesh>
  );
}

export function Hero3D(): React.JSX.Element | null {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInquireView(containerRef);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return null;
  }
  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10">
      {inView ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4], fov: 45 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#0a0f1a']} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[2, 2, 3]} intensity={1.2} color={'#ffffff'} />
          <pointLight position={[-3, -2, -2]} intensity={0.6} color={'#00a3ff'} />
          <TorusKnot />
        </Canvas>
      ) : null}
    </div>
  );
}

function useInquireView(ref: React.RefObject<Element>) {
  const inView = useInView(ref, { amount: 0.2, once: true, margin: '0px' });
  return inView;
}
