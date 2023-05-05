import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCrosshairs,
    faFingerprint,
    faRocket,
    faTag,
    faXmark,
    faFlag,
    faGaugeHigh,
    faArrowsUpDownLeftRight,
    faCheck,
    faEarth,
    faCube,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "./inputs/TextInput";
import {
    Satellite,
    SatelliteCountry,
    SatelliteLaunchSite,
    SatelliteSize,
    SatelliteType,
} from "../scene/satellite";
import { useContext, useEffect, useState } from "react";
import Multiselect from "./inputs/MultiSelect";
import DoubleSlider from "./inputs/DoubleSlider";
import Filter from "./Filter";
import SatellitesContext from "../../contexts/SatellitesContext";
import { Virtuoso } from "react-virtuoso";
import { Constants } from "../../Constants";
import Settings from "./MenuSettings";
import { useTranslation } from "react-i18next";

library.add(
    faXmark,
    faTag,
    faFingerprint,
    faRocket,
    faCrosshairs,
    faFlag,
    faGaugeHigh,
    faArrowsUpDownLeftRight,
    faCheck,
    faEarth,
    faCube
);

function Menu(props: { opened: boolean; toggle: () => void }) {
    const { t } = useTranslation();

    const [name, setName] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [distanceToEarth, setDistanceToEarth] = useState<[number, number]>([
        Constants.LOWEST_EARTH_ORBIT,
        Constants.HIGHEST_EARTH_ORBIT,
    ]);
    const [speed, setSpeed] = useState<[number, number]>([
        Constants.MIN_SPEED,
        Constants.MAX_SPEED,
    ]);
    const [launchDate, setLaunchDate] = useState<Date>(null!);
    const [launchSites, setLaunchSites] = useState<(keyof typeof SatelliteLaunchSite)[]>([]);
    const [sizes, setSizes] = useState<(keyof typeof SatelliteSize)[]>([]);
    const [types, setTypes] = useState<(keyof typeof SatelliteType)[]>([]);
    const [countries, setCountries] = useState<(keyof typeof SatelliteCountry)[]>([]);

    const satellites = useContext(SatellitesContext);
    const [filteredSatellites, setFilteredSatellites] = useState<Satellite[]>(satellites.slice());

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const filter = new Filter(
            name,
            id,
            distanceToEarth,
            launchDate,
            launchSites,
            sizes,
            speed,
            countries,
            types
        );

        filter!.apply(satellites);
        setFilteredSatellites(satellites.slice().filter((s) => s.show));
    };

    return (
        <div
            className={`${
                props.opened ? "" : "translate-x-full invisible"
            } absolute top-0 right-0 bottom-0 bg-gradient-to-b from-slate-700/75 to-[#20395C] transition-all h-screen p-5 overflow-scroll rounded-l-lg border-[1px] border-gray-800 backdrop-blur-sm select-none`}
        >
            <div className="flex items-center content-center gap-3">
                <button
                    className="p-3 bg-gray-800 hover:bg-slate-700 transition-colors rounded-md right-5 top-5 absolute"
                    onClick={props.toggle}
                >
                    <FontAwesomeIcon icon="xmark" size="xl" color="#6B7280" />
                </button>

                <h1 className="text-amber-600 font-bold text-3xl">{t("menu.filter.title")}</h1>
            </div>
            <form onSubmit={submit}>
                <div className="text-gray-500">
                    <div className="flex gap-5 flex-col justify-center items-center">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                            <Input
                                set={setName}
                                icon="tag"
                                placeholder={t("menu.filter.name.placeholder")}
                                type="text"
                                label={t("menu.filter.name.label")}
                            />
                            <Input
                                set={setId}
                                icon="fingerprint"
                                placeholder={t("menu.filter.id.placeholder")}
                                type="text"
                                label={t("menu.filter.id.label")}
                            />
                        </div>
                        <div className="flex text-center gap-0 sm:gap-5">
                            <DoubleSlider
                                icon="earth"
                                label={t("menu.filter.distance.label")}
                                set={setDistanceToEarth}
                                get={distanceToEarth}
                                min={Constants.LOWEST_EARTH_ORBIT}
                                max={Constants.HIGHEST_EARTH_ORBIT}
                            />
                        </div>
                        <div className="flex text-center gap-0 sm:gap-5">
                            <DoubleSlider
                                icon="gauge-high"
                                label={t("menu.filter.speed.label")}
                                set={setSpeed}
                                get={speed}
                                min={Constants.MIN_SPEED}
                                max={Constants.MAX_SPEED}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                            <Input
                                set={(d) => setLaunchDate(new Date(d))}
                                icon="rocket"
                                type="date"
                                label={t("menu.filter.launch_date.label")}
                            />
                            <Multiselect
                                get={launchSites}
                                set={setLaunchSites}
                                options={Object.values(SatelliteLaunchSite).map((s) => t(s))}
                                label={t("menu.filter.launch_sites.label")}
                                icon="crosshairs"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                            <Multiselect
                                get={sizes}
                                set={setSizes}
                                options={Object.values(SatelliteSize).map((s) => t(s))}
                                label={t("menu.filter.sizes.label")}
                                icon="arrows-up-down-left-right"
                            />
                            <Multiselect
                                get={types}
                                set={setTypes}
                                options={Object.values(SatelliteType).map((s) => t(s))}
                                label={t("menu.filter.types.label")}
                                icon="cube"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                            <Multiselect
                                get={countries}
                                set={setCountries}
                                options={Object.values(SatelliteCountry).map((s) => t(s))}
                                label={t("menu.filter.countries.label")}
                                icon="flag"
                            />
                            <Input
                                set={submit}
                                icon="check"
                                type="submit"
                                style="bg-amber-600 text-slate-300 hover:bg-amber-700 active:bg-amber-800 transition-colors cursor-pointer"
                                iconColor="#CBD5E1"
                                label="​" // Zero width space to make sure the spacing is correct
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className="py-5">
                <h1 className="text-amber-600 font-bold text-3xl">
                    {t("menu.results.title", { count: filteredSatellites.length })}
                </h1>
                <div className="h-64">
                    <Virtuoso
                        style={{ height: "256px" }}
                        data={filteredSatellites}
                        itemContent={(index) => (
                            <div className="m-1 py-2 px-4 rounded-xl bg-gray-800 text-slate-300">
                                <p>{filteredSatellites[index].name}</p>
                                <pre className="text-sm text-gray-500">
                                    {filteredSatellites[index].id}
                                </pre>
                            </div>
                        )}
                    />
                </div>
            </div>
            <Settings />
        </div>
    );
}

export default Menu;
