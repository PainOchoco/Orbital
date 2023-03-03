import { useLoader } from "@react-three/fiber";
import { useContext } from "react";
import { BackSide, TextureLoader } from "three";
import skyImage from "../../assets/skymap.jpg";
import { Constants } from "../../Constants";
import SettingsContext from "../../contexts/SettingsContext";

function SkyDome() {
    const { settings } = useContext(SettingsContext);
    const skyTexture = useLoader(TextureLoader, skyImage);

    return (
        <mesh visible={settings.showSkymap}>
            <sphereGeometry args={[Constants.CAMERA_MAX_DISTANCE / 2, 32, 32]} />
            <meshBasicMaterial map={skyTexture} side={BackSide} />
        </mesh>
    );
}

export default SkyDome;
