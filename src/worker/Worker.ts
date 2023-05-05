import { EciVec3, propagate, SatRec } from "satellite.js";
import { Euler, Vector3 } from "three";
import { Coordinates, Satellite } from "../components/scene/satellite/Satellite";
import { Constants } from "../Constants";
import { Settings } from "../contexts/SettingsContext";
import { WorkerInstruction, WorkerRequest, WorkerResponse } from "./WorkerProtocol";

let satellites = new Array<Satellite>();
let settings: Settings;
let frameCount = 0;
onmessage = (event: MessageEvent<WorkerRequest>) => {
    if (event.data.instruction == WorkerInstruction.INIT) {
        if (event.data.data) satellites = event.data.data;
        if (event.data.settings) settings = event.data.settings;
    }

    if (event.data.instruction == WorkerInstruction.COORDINATES) {
        const date = new Date();
        setInterval(() => {
            const coordinates = new Array<Coordinates>();

            for (let i = 0; i < satellites.length; i++) {
                const satellite = satellites[i];
                coordinates.push(updateCoordinates(satellite.satrec, date));
            }

            postMessage({
                instruction: WorkerInstruction.COORDINATES,
                data: coordinates,
            } as WorkerResponse);

            const timeMultiplier = settings?.timeMultiplier ? settings.timeMultiplier : 1;
            const nextFrameTime =
                new Date().getTime() + frameCount * Constants.TIME_JUMP * timeMultiplier;

            date.setTime(nextFrameTime);
            frameCount++;
        }, Constants.TIME_JUMP);
    }

    // One time computation
    if (event.data.instruction == WorkerInstruction.ORBITS) {
        const orbits = new Array<Vector3[]>();
        const satelliteOrbits = event.data.data!;

        for (let i = 0; i < satelliteOrbits.length; i++) {
            const satellite = satelliteOrbits[i];
            orbits.push(updateOrbit(satellite.satrec, new Date()));
        }

        postMessage({
            instruction: WorkerInstruction.ORBITS,
            data: orbits,
        } as WorkerResponse);
    }
};

const getSceneVector = (vector: boolean | EciVec3<number>): Vector3 => {
    const result = new Vector3(0, 0, 0);
    // Check for error
    if (vector) {
        const v = vector as EciVec3<number>;
        result.set(v.x / Constants.FACTOR, v.y / Constants.FACTOR, v.z / Constants.FACTOR);
        // 90° rotation along the X axis
        result.applyEuler(new Euler(-Math.PI / 2, 0, 0));
    }
    return result;
};

const updateCoordinates = (satrec: SatRec, date: Date): Coordinates => {
    const positionAndVelocity = propagate(satrec, date);

    const position = getSceneVector(positionAndVelocity.position);
    const velocity = getSceneVector(positionAndVelocity.velocity);

    return { position, velocity };
};

const updateOrbit = (satrec: SatRec, date: Date): Vector3[] => {
    const points = new Array<Vector3>();
    const p = new Vector3();
    const period = (2 * Math.PI) / satrec.no;

    const timeSlice = period / Constants.ORBIT_POINTS;

    let i = 0;
    while (i < Constants.ORBIT_POINTS + 1) {
        const t = date.getTime() + i * timeSlice * 60000;
        const pos = updateCoordinates(satrec, new Date(t)).position;

        p.set(pos.x, pos.y, pos.z);
        points.push(p.clone());
        i++;
    }

    return points;
};
