import { SatRec, twoline2satrec } from "satellite.js";
import { CatmullRomCurve3, Vector3 } from "three";
import { Constants } from "../../../Constants";
import {
    SatelliteCountry,
    SatelliteLaunchSite,
    SatelliteRaw,
    SatelliteSize,
    SatelliteType,
} from ".";

export type Coordinates = {
    position: Vector3;
    velocity: Vector3;
};

export class Satellite {
    name: string;
    launchDate: Date | null = null;
    launchSite: keyof typeof SatelliteLaunchSite = "UNKN";
    type: keyof typeof SatelliteType = "UNKNOWN";
    size: keyof typeof SatelliteSize = "UNKNOWN";
    country: keyof typeof SatelliteCountry = "UNKNOWN";
    lastUpdated: Date | null = null;
    id: string;
    satrec: SatRec;
    coordinates: Coordinates = {
        position: new Vector3(0, 0, 0),
        velocity: new Vector3(0, 0, 0),
    };
    orbit: CatmullRomCurve3;
    show: boolean = true;

    constructor(raw: SatelliteRaw) {
        this.name = raw.OBJECT_NAME;

        this.launchDate = raw.LAUNCH_DATE ? new Date(Date.parse(raw.LAUNCH_DATE)) : null;

        this.launchSite = raw.SITE ? (raw.SITE as keyof typeof SatelliteLaunchSite) : "UNKN";

        this.type = raw.OBJECT_TYPE ? (raw.OBJECT_TYPE as keyof typeof SatelliteType) : "UNKNOWN";

        this.size = raw.RCS_SIZE ? (raw.RCS_SIZE as keyof typeof SatelliteSize) : "UNKNOWN";

        this.country = raw.COUNTRY_CODE
            ? (raw.COUNTRY_CODE as keyof typeof SatelliteCountry)
            : "UNKNOWN";

        this.lastUpdated = raw.CREATION_DATE ? new Date(Date.parse(raw.CREATION_DATE)) : null;

        this.id = raw.NORAD_CAT_ID;

        this.satrec = twoline2satrec(raw.TLE_LINE1!, raw.TLE_LINE2!);
    }

    getNorm(vector: Vector3): number {
        return (
            Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2)) *
            Constants.FACTOR
        );
    }

    getVelocity(): number {
        return this.getNorm(this.coordinates.velocity);
    }

    getDistanceToEarth(): number {
        return this.getNorm(this.coordinates.position) / Constants.FACTOR + Constants.EARTH_RADIUS;
    }
}
