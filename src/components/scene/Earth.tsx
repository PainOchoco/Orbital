import { useLoader } from "@react-three/fiber";
import { AdditiveBlending, BackSide, TextureLoader } from "three";
import EarthTexture from "../../assets/earth-texture.jpg";
import { Constants } from "../../Constants";
import EarthFragment from "../../shaders/EarthFragment.glsl";
import EarthVertex from "../../shaders/EarthVertex.glsl";
import AtmosphereVertex from "../../shaders/AtmosphereVertex.glsl";
import AtmosphereFragment from "../../shaders/AtmosphereFragment.glsl";

function Earth() {
    const earthTexture = useLoader(TextureLoader, EarthTexture);

    return (
        <>
            <mesh name={Constants.EARTH_MESH_NAME}>
                <sphereGeometry args={[Constants.EARTH_RADIUS, 32, 32]} />
                <shaderMaterial
                    fragmentShader={EarthFragment}
                    vertexShader={EarthVertex}
                    uniforms={{ earthTexture: { value: earthTexture } }}
                />
            </mesh>

            <mesh>
                <sphereGeometry args={[Constants.EARTH_RADIUS * 1.1, 32, 32]} />
                <shaderMaterial
                    transparent={true}
                    fragmentShader={AtmosphereFragment}
                    vertexShader={AtmosphereVertex}
                    blending={AdditiveBlending}
                    side={BackSide}
                />
            </mesh>
        </>
    );
}

export default Earth;
