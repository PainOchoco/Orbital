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
import { useContext, useState } from "react";
import Multiselect from "./inputs/MultiSelect";
import DoubleSlider from "./inputs/DoubleSlider";
import Filter from "./Filter";
import SatellitesContext from "../../contexts/SatellitesContext";
import { Virtuoso } from "react-virtuoso";
import { Constants } from "../../Constants";

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
    const [launchSites, setLaunchSites] = useState<SatelliteLaunchSite[]>([]);
    const [sizes, setSizes] = useState<SatelliteSize[]>([]);
    const [types, setTypes] = useState<SatelliteType[]>([]);
    const [countries, setCountries] = useState<SatelliteCountry[]>([]);

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
            } absolute top-0 right-0 bottom-0 bg-gradient-to-b from-slate-700 to-[#20395C] transition-all h-screen p-5 overflow-scroll`}
        >
            <div className="flex items-center content-center gap-3">
                <button
                    className="p-3 bg-gray-800 hover:bg-slate-700 transition-colors rounded-md right-5 top-5 absolute"
                    onClick={props.toggle}
                >
                    <FontAwesomeIcon icon="xmark" size="xl" color="#6B7280" />
                </button>

                <h1 className="text-amber-600 font-bold text-3xl">Filters</h1>
            </div>
            <form onSubmit={submit}>
                <div className="text-gray-500">
                    <div className="flex gap-5 flex-col justify-center items-center">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                            <Input
                                set={setName}
                                icon="tag"
                                placeholder="Name or pattern..."
                                type="text"
                                label="Name"
                            />
                            <Input
                                set={setId}
                                icon="fingerprint"
                                placeholder="ID..."
                                type="text"
                                label="Norad ID"
                            />
                        </div>
                        <div className="flex text-center gap-0 sm:gap-5">
                            <DoubleSlider
                                icon="earth"
                                label={"Distance to Earth (10³ km)"}
                                set={setDistanceToEarth}
                                get={distanceToEarth}
                                min={Constants.LOWEST_EARTH_ORBIT}
                                max={Constants.HIGHEST_EARTH_ORBIT}
                            />
                        </div>
                        <div className="flex text-center gap-0 sm:gap-5">
                            <DoubleSlider
                                icon="gauge-high"
                                label="Speed (km/s)"
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
                                placeholder=""
                                type="date"
                                label="Launch date"
                            />
                            <Multiselect
                                get={launchSites}
                                set={setLaunchSites}
                                enum={SatelliteLaunchSite}
                                label="Launch sites"
                                icon="crosshairs"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                            <Multiselect
                                get={sizes}
                                set={setSizes}
                                enum={SatelliteSize}
                                label="Sizes"
                                icon="arrows-up-down-left-right"
                            />
                            <Multiselect
                                get={types}
                                set={setTypes}
                                enum={SatelliteType}
                                label="Types"
                                icon="cube"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-10">
                            <Multiselect
                                get={countries}
                                set={setCountries}
                                enum={SatelliteCountry}
                                label="Countries"
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
            <div>
                <h1 className="text-amber-600 font-bold text-3xl pt-5">
                    Objects Found <span className="text-sm">{filteredSatellites.length}</span>
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
        </div>
    );
}

export default Menu;
