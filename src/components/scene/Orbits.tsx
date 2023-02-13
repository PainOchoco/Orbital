import { useEffect, useRef } from "react";
import { BufferGeometry, CatmullRomCurve3, LineLoop, Vector3 } from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import { Constants } from "../../Constants";
import { Event, EventEmitter } from "../../events/";
import { WorkerInstruction, WorkerRequest, WorkerResponse } from "../../worker/WorkerProtocol";
import { Satellite } from "./satellite/";

import { extend, ReactThreeFiber } from "@react-three/fiber";
import * as THREE from "three";

extend({ Line_: THREE.Line });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>;
        }
    }
}

let worker: Worker;

function Orbits() {
    const orbitsMeshRef = useRef<LineLoop>(null!);

    function onSatelliteHover(satellite: Satellite) {
        worker.postMessage({
            instruction: WorkerInstruction.ORBITS,
            data: [satellite],
        } as WorkerRequest);
    }

    function onSatelliteUnhover() {
        orbitsMeshRef.current.visible = false;
    }

    useEffect(() => {
        worker = new Worker(new URL("../../worker/Worker.ts", import.meta.url), {
            type: "module",
        });

        worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
            if (event.data.instruction == WorkerInstruction.ORBITS) {
                const orbits = event.data.data as Vector3[][];
                const orbitGeometries = new Array<BufferGeometry>();
                for (let i = 0; i < orbits.length; i++) {
                    const orbitPoints = orbits[i].map((p) => new Vector3(p.x, p.y, p.z));

                    const curve = new CatmullRomCurve3(orbitPoints);
                    const geometry = new BufferGeometry().setFromPoints(curve.getPoints(100));
                    orbitGeometries.push(geometry);
                }

                orbitsMeshRef.current.geometry = mergeBufferGeometries(orbitGeometries);
                orbitsMeshRef.current.visible = true;
            }
        };

        EventEmitter.on(Event.SATELLITE_HOVER, onSatelliteHover);
        EventEmitter.on(Event.SATELLITE_UNHOVER, onSatelliteUnhover);
    });

    return (
        <line_ name={Constants.ORBITS_MESH_NAME} ref={orbitsMeshRef}>
            <lineBasicMaterial color={0xd97706} />
        </line_>
    );
}

export default Orbits;
