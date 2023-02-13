import { useLoader } from "@react-three/fiber";
import { BackSide, TextureLoader } from "three";
import skyImage from "../../assets/skymap.jpg";
import { Constants } from "../../Constants";

function SkyDome() {
    const skyTexture = useLoader(TextureLoader, skyImage);

    return (
        <mesh>
            <sphereGeometry args={[Constants.CAMERA_MAX_DISTANCE / 2, 32, 32]} />
            <meshBasicMaterial map={skyTexture} side={BackSide} />
        </mesh>
    );
}

export default SkyDome;
