import DirectionalLight from './DirectionalLight';
import { Canvas } from '@react-three/fiber';
import { CloudSpawner } from './Spawner';
import ProjectCube from './ProjectCube';
import WasdControls from './WasdControls';
import ProximityTrigger from './ProximityTrigger';
import { Fragment, useEffect, useState } from 'react';

const API_BASE = import.meta.env.DEV ? 'http://localhost:8000' : '';
const PROJECT_PROXIMITY_RADIUS = 3;
const ABOUT_CUBE_POSITION = [0, 2, -14];

export const Default = ({ ...props }) =>{
    const { theme, x, y, mousedown } = props;
    const isThunderCloud = theme == "about" ? true : false;
    const [ projects, setProjects ] = useState([]);
    const [ aboutObject, setAboutObject ] = useState(null);
    const [ nearProjectId, setNearProjectId ] = useState(null);

    useEffect(() => {
        if(theme != "projects"){
            return;
        };
        fetch(`${API_BASE}/api/objects?type=project`)
            .then((res) => res.json())
            .then((objects) => setProjects(objects));
        fetch(`${API_BASE}/api/objects/about`)
            .then((res) => res.json())
            .then((object) => setAboutObject(object));
    }, [theme]);

    const sceneObjects = aboutObject
        ? [...projects, { ...aboutObject, position: ABOUT_CUBE_POSITION }]
        : projects;

    const nearProject = sceneObjects.find((p) => p.id == nearProjectId) ?? null;

    return(
        <>
            <div {...props}>
                <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
                    <DirectionalLight></DirectionalLight>
                    {theme != "projects" && <CloudSpawner {...props} isThunderCloud={isThunderCloud}/>}
                    {theme == "projects" && <WasdControls x={x} y={y} mousedown={mousedown}/>}
                    {theme == "projects" && sceneObjects.map((p) => (
                        <Fragment key={p.id}>
                            <ProjectCube
                                textureUrl={p.textureUrl}
                                position={p.position}
                                rotation={[-Math.PI / 4, -Math.PI / 4, 0]}
                            />
                            <ProximityTrigger
                                position={p.position}
                                radius={PROJECT_PROXIMITY_RADIUS}
                                onChange={(inside) => setNearProjectId((current) => {
                                    if(inside){
                                        return p.id;
                                    };
                                    return current == p.id ? null : current;
                                })}
                            />
                        </Fragment>
                    ))}
                </Canvas>
                {theme == "projects" && nearProject && (
                    <div style={{ zIndex: 1 }} className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[90%] md:w-[50%] max-h-[40vh] border-2 border-[#d4af37] rounded-xl bg-[#5c5c5cb3] p-4 flex flex-col items-center">
                        <h1 className="text-center font-pixelify text-[#d4af37] text-[4vmin] md:text-[2.5vmin] underline underline-offset-[1%]">
                            {nearProject.ghLink ? (
                                <a href={nearProject.ghLink} target="_blank" rel="noopener noreferrer" className="text-[#d4af37]">{nearProject.title}</a>
                            ) : nearProject.title}
                        </h1>
                        <p style={{overflowY:"auto"}} className="w-full text-center font-pixelify text-[#d4af37] text-[2.5vmin] md:text-[1.6vmin]">{nearProject.desc}</p>
                    </div>
                )}
            </div>
        </>
    );
};
export default Default;