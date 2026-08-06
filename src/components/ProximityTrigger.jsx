import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

export const ProximityTrigger = ({ position, radius, onChange }) => {
  const { camera } = useThree();
  const inside = useRef(false);

  useFrame(() => {
    const dx = camera.position.x - position[0];
    const dy = camera.position.y - position[1];
    const dz = camera.position.z - position[2];
    const distSq = dx * dx + dy * dy + dz * dz;
    const nowInside = distSq <= radius * radius;
    if (nowInside !== inside.current) {
      inside.current = nowInside;
      onChange(nowInside);
    }
  });

  return null;
};
export default ProximityTrigger;
