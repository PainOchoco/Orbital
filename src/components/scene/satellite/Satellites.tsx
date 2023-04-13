import { useFrame } from "@react-three/fiber";
import { useContext, useEffect, useRef } from "react";
import { Color, InstancedMesh, Object3D, Vector3 } from "three";
import { Coordinates, Satellite } from "./Satellite";
import { WorkerInstruction, WorkerRequest, WorkerResponse } from "../../../worker/WorkerProtocol";
import { Constants } from "../../../Constants";
import { colors } from ".";
import SatellitesContext from "../../../contexts/SatellitesContext";
import Emitter from "../../../events/EventEmitter";
import Event from "../../../events/Event";
import SettingsContext from "../../../contexts/SettingsContext";

let updatedCoordinates = new Array<Coordinates>();
const color = new Color();
const zeroVector = new Vector3(0, 0, 0);
const dummy = new Object3D();
let worker: Worker;

function Satellites() {
    const meshRef = useRef<InstancedMesh>(null!);
    const satellites = useContext(SatellitesContext);
    const { settings, setSettings } = useContext(SettingsContext);

    function onSatelliteHover(satellite: Satellite) {
        meshRef.current.setColorAt(
            satellites.indexOf(satellite),
            // Slightly lighter color than the original, gives an higlighting effect
            color.set(colors[satellite.type]).addScalar(0.2)
        );
    }

    function onSatelliteUnhover(satellite: Satellite) {
        meshRef.current.setColorAt(
            satellites.indexOf(satellite),
            color.set(colors[satellite.type])
        );
    }

    // Initialization
    useEffect(() => {
        worker = new Worker(new URL("../../../worker/Worker.ts", import.meta.url), {
            type: "module",
        });

        worker.postMessage({
            instruction: WorkerInstruction.INIT,
            data: satellites,
            settings: settings,
        } as WorkerRequest);

        worker.postMessage({
            instruction: WorkerInstruction.COORDINATES,
        } as WorkerRequest);

        worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
            if (event.data.instruction == WorkerInstruction.COORDINATES) {
                updatedCoordinates = event.data.data as Coordinates[];
            }
        };

        // Set color by type
        for (let i = 0; i < satellites.length; i++) {
            const satellite = satellites[i];
            meshRef.current.setColorAt(i, color.set(colors[satellite.type]));
        }

        Emitter.on(Event.SATELLITE_HOVER, onSatelliteHover);
        Emitter.on(Event.SATELLITE_UNHOVER, onSatelliteUnhover);
    }, []);

    // Update settings
    useEffect(() => {
        worker.postMessage({
            instruction: WorkerInstruction.INIT,
            settings: settings,
        } as WorkerRequest);
    }, [settings]);

    useFrame((state, delta) => {
        if (updatedCoordinates.length) {
            for (let i = 0; i < satellites.length; i++) {
                const satellite = satellites[i];

                const position = satellite.show ? updatedCoordinates[i].position : zeroVector;

                satellite.coordinates.velocity = updatedCoordinates[i].velocity;
                const pos = satellite.coordinates.position;

                // Smoooooth
                let interpolatedPos;
                if (position == zeroVector || pos == zeroVector) {
                    interpolatedPos = position;
                } else {
                    interpolatedPos = pos.lerp(position, delta);
                }

                dummy.position.set(interpolatedPos.x, interpolatedPos.y, interpolatedPos.z);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
            meshRef.current.instanceColor!.needsUpdate = true;
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh
            name={Constants.SATELLITES_MESH_NAME}
            ref={meshRef}
            args={[undefined, undefined, satellites.length]}
        >
            <sphereGeometry args={[0.04, 8, 4]}></sphereGeometry>
            <meshLambertMaterial></meshLambertMaterial>
        </instancedMesh>
    );
}

export default Satellites;
