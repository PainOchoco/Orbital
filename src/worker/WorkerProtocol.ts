import { Vector3 } from "three";
import { Coordinates, Satellite } from "../components/scene/satellite/Satellite";
import { Settings } from "../contexts/SettingsContext";
export enum WorkerInstruction {
    INIT,
    COORDINATES,
    ORBITS,
}

export type WorkerRequest = {
    instruction: WorkerInstruction;
    data?: Satellite[];
    settings?: Settings;
};

export type WorkerResponse = {
    instruction: WorkerInstruction;
    data: Coordinates[] | Vector3[][];
};
