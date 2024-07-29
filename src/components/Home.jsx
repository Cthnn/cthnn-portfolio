import Cube from './Cube';
import Text from './Text';
import DirectionalLight from './DirectionalLight';
import { Canvas } from '@react-three/fiber';
import { CloudSpawner } from './Spawner';
import { useEffect, useState } from 'react';

function scaleDepth(range){
    var slope = ((1495/715)-(360/1080))/-range;
    var depth = ((window.innerWidth/window.innerHeight)-(1495/715))/slope;
    if(depth > range){
        depth = range;
    };
    if(depth < 0){
        depth = 0;
    };
    return depth;
}

export const Home = ({ ...props }) =>{
    const [ textDepth, setTextDepth ] = useState(-6-scaleDepth(50));
    const [ cubeDepth, setCubeDepth ] = useState(-2-scaleDepth(10));
    useEffect(() => {
        const handleResize = () => {
            setTextDepth(-6-scaleDepth(50));
            setCubeDepth(-2-scaleDepth(10));
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
      }, []);
    return(
        <>
            <div style={{ zIndex:0 }} className='bg-home mx-auto flex w-full h-full flex-col flex-wrap items-center'>
                <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
                    <DirectionalLight></DirectionalLight>
                    <Text scale={1} position={[-8.5,0,textDepth]}></Text>
                    <Cube scale={1} position={[1.5, 0,cubeDepth]}></Cube>
                    <CloudSpawner {...props} position={[0, 0, -0.1]} isThunderCloud={false}/>
                </Canvas>
            </div>
        </>
    );
};
export default Home;