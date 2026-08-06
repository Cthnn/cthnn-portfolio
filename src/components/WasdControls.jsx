import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SPEED = 4;
const LOOK_SENSITIVITY = 2.5;
const PITCH_LIMIT = Math.PI / 2 - 0.01;

export const WasdControls = ({ x = 0, y = 0, mousedown = 0 }) => {
  const { camera } = useThree();
  const keys = useRef({ w: false, a: false, s: false, d: false, ' ': false, shift: false });
  const yaw = useRef(0);
  const pitch = useRef(0);
  const prevPointer = useRef({ x, y });
  const wasDragging = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key in keys.current) {
        if (key == ' ') {
          e.preventDefault();
        }
        keys.current[key] = true;
      }
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key in keys.current) {
        keys.current[key] = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();

  useFrame((_, delta) => {
    if (mousedown) {
      if (wasDragging.current) {
        const dx = x - prevPointer.current.x;
        const dy = y - prevPointer.current.y;
        yaw.current -= dx * LOOK_SENSITIVITY;
        pitch.current = THREE.MathUtils.clamp(pitch.current + dy * LOOK_SENSITIVITY, -PITCH_LIMIT, PITCH_LIMIT);
        camera.rotation.set(pitch.current, yaw.current, 0, 'YXZ');
      }
      wasDragging.current = true;
    } else {
      wasDragging.current = false;
    }
    prevPointer.current = { x, y };

    const { w, a, s, d, ' ': space, shift } = keys.current;
    if (!w && !a && !s && !d && !space && !shift) {
      return;
    }
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, camera.up).normalize();

    const move = new THREE.Vector3();
    if (w) move.add(forward);
    if (s) move.sub(forward);
    if (d) move.add(right);
    if (a) move.sub(right);
    if (space) move.y += 1;
    if (shift) move.y -= 1;
    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(SPEED * delta);
      camera.position.add(move);
    }
  });

  return null;
};
export default WasdControls;
