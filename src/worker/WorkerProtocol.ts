import { Vector3 } from "three";
import { Coordinates, Satellite } from "../components/scene/satellite/Satellite";
export enum WorkerInstruction {
    INIT,
    COORDINATES,
    ORBITS,
}

export type WorkerRequest = {
    instruction: WorkerInstruction;
    data?: Satellite[];
};

export type WorkerResponse = {
    instruction: WorkerInstruction;
    data: Coordinates[] | Vector3[][];
};
