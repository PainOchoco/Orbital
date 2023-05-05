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
import {
    Satellite,
    SatelliteCountry,
    SatelliteLaunchSite,
    SatelliteSize,
    SatelliteType,
} from "./satellite/";
import { t } from "i18next";
import { useEffect } from "react";

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
                    <span className="text-gray-500 font-bold">{t("info.position.title")}</span>
                </div>
                <p className="text-slate-300">
                    {t("info.position.x", { value: props.satellite.coordinates.position.x })}
                    <br />
                    {t("info.position.y", { value: props.satellite.coordinates.position.y })}
                    <br />
                    {t("info.position.z", { value: props.satellite.coordinates.position.z })}
                </p>
            </div>
            <div>
                <FontAwesomeIcon icon="gauge-high" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">{t("info.velocity.title")}</span>
                <p className="text-slate-300">
                    {t("info.velocity.value", { value: props.satellite.getVelocity() })}
                </p>
            </div>
            <div>
                <FontAwesomeIcon icon="rocket" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">{t("info.launch.title")}</span>
                <p className="text-slate-300">
                    {t("info.launch.date", {
                        date: props.satellite.launchDate,
                    })}
                </p>
                <p className="text-slate-300">
                    {t("info.launch.site", {
                        site: t(SatelliteLaunchSite[props.satellite.launchSite]),
                    })}
                </p>
            </div>
            <div>
                <FontAwesomeIcon icon="flag" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">{t("info.country.title")}</span>
                <p className="text-slate-300">
                    {t("info.country.value", {
                        country: t(SatelliteCountry[props.satellite.country]),
                    })}
                </p>
            </div>
            <div>
                <FontAwesomeIcon icon="satellite" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">{t("info.type.title")}</span>
                <p className="text-slate-300">
                    {t("info.type.value", { type: t(SatelliteType[props.satellite.type]) })}
                </p>
            </div>
            <div>
                <FontAwesomeIcon
                    icon="arrows-up-down-left-right"
                    color="#D97706"
                    className="pr-1"
                />
                <span className="text-gray-500 font-bold">{t("info.size.title")}</span>
                <p className="text-slate-300">
                    {t("info.size.value", { size: t(SatelliteSize[props.satellite.size]) })}
                </p>
            </div>
            <div>
                <FontAwesomeIcon icon="clock" color="#D97706" className="pr-1" />
                <span className="text-gray-500 font-bold">{t("info.last_updated.title")}</span>
                <p className="text-slate-300">
                    {t("info.last_updated.value", {
                        lastUpdated: props.satellite.lastUpdated,
                    })}
                </p>
            </div>
        </div>
    );
}

export default Info;
