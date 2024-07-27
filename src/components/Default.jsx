import DirectionalLight from './DirectionalLight';
import { Canvas } from '@react-three/fiber';
import { CloudSpawner } from './Spawner';

export const Default = ({ ...props }) =>{
    const { theme } = props;
    const isThunderCloud = theme == "about" ? true : false;
    return(
        <>
            <div {...props}>
                <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
                    <DirectionalLight></DirectionalLight>
                    <CloudSpawner {...props} isThunderCloud={isThunderCloud}/>
                </Canvas>
            </div>
        </>
    );
};
export default Default;