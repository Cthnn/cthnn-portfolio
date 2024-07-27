import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export const DirectionalLight = ({ ...props }) => {
    const lightRef = useRef();
    const { scene } = useThree();

    useEffect(() => {
        if (lightRef.current) {
        lightRef.current.target.position.set(0, 0, -8);
        scene.add(lightRef.current.target);
        };
    }, [scene]);
  
    return (
        <directionalLight
            ref={lightRef}
            color="white"
            position={[-5, 10, 8]}
            intensity={7}
            castShadow
        />
    );
};
export default DirectionalLight;