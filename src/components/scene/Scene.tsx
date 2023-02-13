import { GradientTexture, OrbitControls, Stats } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Earth from "./Earth";
import { Constants } from "../../Constants";
import { Vector2 } from "three";
import { useEffect, useState } from "react";
import data from "../../data_old.json";
import { Satellites, Satellite, SatelliteRaw } from "./satellite/";
import Tag from "./Tag";
import SatellitesContext from "../../contexts/SatellitesContext";
import Orbits from "./Orbits";
import SkyDome from "./SkyDome";
import MenuButton from "../menu/MenuButton";

function Scene() {
    const [satellites, setSatellites] = useState(new Array<Satellite>());

    const rawSatellites: SatelliteRaw[] = data as SatelliteRaw[];
    for (let i = 0; i < rawSatellites.length; i++) {
        satellites.push(new Satellite(rawSatellites[i]));
    }

    return (
        <SatellitesContext.Provider value={satellites}>
            <div className="relative w-screen h-screen">
                <Canvas
                    camera={{
                        position: [0, 0, Constants.CAMERA_DISTANCE],
                        near: Constants.CAMERA_MIN_DISTANCE,
                        far: Constants.CAMERA_MAX_DISTANCE,
                    }}
                >
                    <GradientTexture
                        attach="background"
                        stops={[0, 1]}
                        colors={[Constants.COLOR_DEEP_BLACK, Constants.COLOR_BLACK]}
                        rotation={(3 * Math.PI) / 4}
                        center={new Vector2(0.5, 0.5)}
                    />
                    <OrbitControls
                        enablePan={false}
                        minDistance={Constants.EARTH_RADIUS + 0.5}
                        maxDistance={Constants.CAMERA_MAX_DISTANCE / 2}
                        target={[0, 0, 0]}
                        makeDefault
                    />
                    <ambientLight />
                    <pointLight position={[10, 6, 10]} />
                    <Earth />
                    {/* <SkyDome /> */}
                    <Satellites />
                    <Orbits />
                    <Tag />
                    <Stats />
                </Canvas>
            </div>
            <MenuButton />
        </SatellitesContext.Provider>
    );
}

export default Scene;
