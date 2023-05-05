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
    launchSites: (keyof typeof SatelliteLaunchSite)[];
    sizes: (keyof typeof SatelliteSize)[];
    speed: [number, number];
    countries: (keyof typeof SatelliteCountry)[];
    types: (keyof typeof SatelliteType)[];

    constructor(
        namePattern: string,
        id: string,
        distanceToEarth: [number, number],
        launchDate: Date,
        launchSites: (keyof typeof SatelliteLaunchSite)[],
        sizes: (keyof typeof SatelliteSize)[],
        speed: [number, number],
        countries: (keyof typeof SatelliteCountry)[],
        types: (keyof typeof SatelliteType)[]
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

            // TODO: Make this more readable, don't know how for now.
            const isNotErrored = sat.coordinates.position != zeroVector;
            const isNameMatching = sat.name.startsWith(this?.namePattern);
            const isIdMatching = !this.id || sat.id == this?.id;
            const isInDistanceRange =
                sat.getDistanceToEarth() >= this.distanceToEarth[0] &&
                sat.getDistanceToEarth() <= this.distanceToEarth[1];
            const isInVelocityRange =
                sat.getVelocity() >= this.speed[0] && sat.getVelocity() <= this.speed[1];
            const isInDateRange =
                (!this.launchDate && !sat.launchDate) ||
                !this.launchDate ||
                (sat.launchDate && sat.launchDate.getTime() >= this.launchDate.getTime());
            const checkLaunchSite =
                !this.launchSites.length || this.launchSites.includes(sat.launchSite);
            const checkSize = !this.sizes.length || this.sizes.includes(sat.size);
            const checkCountries = !this.countries.length || this.countries.includes(sat.country);
            const checkTypes = !this.types.length || this.types.includes(sat.type);

            const isCompliant =
                isNotErrored &&
                isNameMatching &&
                isIdMatching &&
                isInDistanceRange &&
                isInDateRange &&
                checkLaunchSite &&
                checkSize &&
                isInVelocityRange &&
                checkCountries &&
                checkTypes;

            sat.show = isCompliant || false;
        }
    }
}

export default Filter;
