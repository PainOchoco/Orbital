import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowsUpDownLeftRight,
    faClock,
    faCrosshairs,
    faFlag,
    faGaugeHigh,
    faRocket,
    faSatellite,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Satellite, SatelliteCountry, SatelliteLaunchSite, SatelliteType } from "./satellite/";

library.add(
    faCrosshairs,
    faGaugeHigh,
    faRocket,
    faSatellite,
    faArrowsUpDownLeftRight,
    faClock,
    faFlag
);

function Info(props: { satellite: Satellite }) {
    return (
        <div>
            <pre className="text-sm text-gray-500">{props.satellite.id}</pre>

            <div>
                <div>
                    <FontAwesomeIcon icon="crosshairs" color="#D97706" className="pr-1" />
                    <span className="text-gray-500 font-bold">Position</span>
                </div>
                <p className="text-slate-300">
                    X: {props.satellite.coordinates.position.x.toFixed(2)}
                    Y: {props.satellite.coordinates.position.y.toFixed(2)}
                    Z: {props.satellite.coordinates.position.x.toFixed(2)}
                </p>
            </div>
            <div>
                <FontAwesomeIcon icon="gauge-high" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">Velocity</span>
                <p className="text-slate-300">{props.satellite.getVelocity().toFixed(2)}km/s</p>
            </div>
            <div>
                <FontAwesomeIcon icon="rocket" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">Launch</span>
                <p className="text-slate-300">{props.satellite.launchDate?.toDateString()}</p>
                <p className="text-slate-300">{SatelliteLaunchSite[props.satellite.launchSite]}</p>
            </div>
            <div>
                <FontAwesomeIcon icon="flag" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">Country/Organization</span>
                <p className="text-slate-300">{SatelliteCountry[props.satellite.country]}</p>
            </div>
            <div>
                <FontAwesomeIcon icon="satellite" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">Object type</span>
                <p className="text-slate-300">{SatelliteType[props.satellite.type]}</p>
            </div>
            <div>
                <FontAwesomeIcon
                    icon="arrows-up-down-left-right"
                    color="#D97706"
                    className="pr-1"
                />
                <span className="text-gray-500 font-bold">Size</span>
                <p className="text-slate-300">{props.satellite.size.toLowerCase()}</p>
            </div>
            <div>
                <FontAwesomeIcon icon="clock" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">Last update</span>
                <p className="text-slate-300">{props.satellite.lastUpdated?.toDateString()}</p>
            </div>
        </div>
    );
}

export default Info;
