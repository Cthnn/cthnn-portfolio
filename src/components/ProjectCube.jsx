import { useTexture } from '@react-three/drei';

export const ProjectCube = ({ textureUrl, ...props }) => {
  const texture = useTexture(textureUrl);
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};
export default ProjectCube;
