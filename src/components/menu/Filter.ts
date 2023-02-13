import { Vector3 } from "three";
import {
    SatelliteCountry,
    SatelliteLaunchSite,
    Satellite,
    SatelliteSize,
    SatelliteType,
} from "../scene/satellite";

const zeroVector = new Vector3(0, 0, 0);

class Filter {
    namePattern: string;
    id: string;
    distanceToEarth: [number, number];
    launchDate: Date;
    launchSites: SatelliteLaunchSite[];
    sizes: SatelliteSize[];
    speed: [number, number];
    countries: SatelliteCountry[];
    types: SatelliteType[];

    constructor(
        namePattern: string,
        id: string,
        distanceToEarth: [number, number],
        launchDate: Date,
        launchSites: SatelliteLaunchSite[],
        sizes: SatelliteSize[],
        speed: [number, number],
        countries: SatelliteCountry[],
        types: SatelliteType[]
    ) {
        this.namePattern = namePattern;
        this.id = id;
        this.distanceToEarth = distanceToEarth;
        this.launchDate = launchDate;
        this.launchSites = launchSites;
        this.sizes = sizes;
        this.speed = speed;
        this.countries = countries;
        this.types = types;
    }

    apply(satellites: Satellite[]) {
        for (let i = 0; i < satellites.length; i++) {
            const sat = satellites[i];

            const isCompliant =
                sat.coordinates.position.x != 0 &&
                sat.coordinates.position.y != 0 &&
                sat.coordinates.position.z != 0 &&
                sat.coordinates.position != zeroVector &&
                sat.name.startsWith(this?.namePattern) &&
                (!this.id || sat.id == this?.id) &&
                sat.getDistanceToEarth() >= this.distanceToEarth[0] &&
                sat.getDistanceToEarth() <= this.distanceToEarth[1] &&
                ((!this.launchDate && !sat.launchDate) ||
                    !this.launchDate ||
                    (sat.launchDate && sat.launchDate.getTime() >= this.launchDate.getTime())) &&
                (!this.launchSites.length ||
                    this.launchSites.includes(SatelliteLaunchSite[sat.launchSite])) &&
                (!this.sizes.length || this.sizes.includes(SatelliteSize[sat.size])) &&
                sat.getVelocity() >= this.speed[0] &&
                sat.getVelocity() <= this.speed[1] &&
                (!this.countries.length ||
                    this.countries.includes(SatelliteCountry[sat.country])) &&
                (!this.types.length || this.types.includes(SatelliteType[sat.type]));

            sat.show = isCompliant || false;
        }
    }
}

export default Filter;
