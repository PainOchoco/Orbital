export namespace Constants {
    export const FACTOR = 1000; // 1 is 1km
    export const EARTH_RADIUS = 6378 / FACTOR;
    export const CAMERA_DISTANCE = 16000 / FACTOR;
    export const COLOR_DEEP_BLACK = "#111827";
    export const COLOR_BLACK = "#1F2937";
    export const COLOR_DARK_GRAY = "#334155";
    export const COLOR_GRAY = "#6B7280";
    export const COLOR_ORANGE = "#D97706";
    export const COLOR_AQUA = "#22D3EE";
    export const SATELLITES_MESH_NAME = "satellites";
    export const ORBITS_MESH_NAME = "orbits";
    export const EARTH_MESH_NAME = "earth";
    export const ORBIT_POINTS = 100;
    export const CAMERA_MAX_DISTANCE = 100000;
    export const CAMERA_MIN_DISTANCE = 0.01;
    export const LOWEST_EARTH_ORBIT = EARTH_RADIUS;
    export const HIGHEST_EARTH_ORBIT = 75000 / FACTOR;
    export const MIN_SPEED = 0;
    export const MAX_SPEED = 11; // fastest i've seen (except weird ones)
    export const TIME_JUMP = 250; // in ms
}
