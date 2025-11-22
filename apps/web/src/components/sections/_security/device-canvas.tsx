'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import type {} from '@react-three/fiber';
import * as React from 'react';

type Rotatable = { rotation: { y: number } };

function ScannerBox({ scanning }: { scanning: boolean }) {
  const ref = React.useRef<Rotatable | null>(null);
  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }
    ref.current.rotation.y += delta * 0.6;
  });
  return (
    <group>
      <mesh
        ref={(node: Rotatable | null) => {
          // tolerate null during unmount
          ref.current = node;
        }}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3, 1.8, 0.3]} />
        {
          (
            <meshStandardMaterial
              color={scanning ? '#00e6b7' : '#8aa0b3'}
              metalness={0.3}
              roughness={0.35}
            />
          ) as unknown as React.ReactElement
        }
      </mesh>
      {/* scanning line */}
      {scanning ? (
        <mesh position={[0, 0, 0.2]}>
          <planeGeometry args={[2.6, 0.05]} />
          {
            (
              <meshBasicMaterial color={'#00ffd0'} transparent opacity={0.8} />
            ) as unknown as React.ReactElement
          }
        </mesh>
      ) : null}
    </group>
  );
}

export function DeviceCanvas({ scanning }: { scanning: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#0b0f16']} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} />
      <pointLight position={[-3, -2, -2]} intensity={0.6} color={'#00a3ff'} />
      <ScannerBox scanning={scanning} />
    </Canvas>
  );
}
