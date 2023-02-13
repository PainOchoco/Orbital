import { useContext, useEffect, useMemo, useState } from "react";
import SatellitesContext from "../../contexts/SatellitesContext";
import { SatelliteType } from "../scene/satellite/";

const bgColors = {
    PAYLOAD: `bg-payload`,
    DEBRIS: "bg-debris",
    "ROCKET BODY": "bg-rocket_body",
    TBA: "bg-tba",
    UNKNOWN: "bg-unknown",
};

function Settings() {
    const satellites = useContext(SatellitesContext);
    const [toggledTypes, setTypes] = useState<Map<keyof typeof SatelliteType, boolean>>(new Map());

    useEffect(() => {
        (Object.keys(SatelliteType) as Array<keyof typeof SatelliteType>).forEach((type) => {
            toggledTypes.set(type, true);
        });
    }, []);

    function toggleType(type: keyof typeof SatelliteType) {
        setTypes(toggledTypes.set(type, !toggledTypes.get(type)!));

        satellites.forEach((s) => {
            if (s.type == type) {
                s.show = toggledTypes.get(type)!;
            }
        });
    }

    const stats = useMemo(() => {
        return (Object.keys(SatelliteType) as Array<keyof typeof SatelliteType>).map((type) => {
            const showedSatellites = satellites.slice().filter((s) => s.show);

            return (
                <label key={type}>
                    <input
                        className="opacity-0 w-0 h-0 peer"
                        type="checkbox"
                        onChange={() => toggleType(type)}
                    />
                    <span
                        className={`${bgColors[type]} p-1 rounded-md cursor-pointer select-none peer-checked:bg-slate-700`}
                    >
                        {type}: {showedSatellites.filter((s) => s.type == type).length}
                    </span>
                </label>
            );
        });
    }, [satellites]);

    return (
        <div className="flex items-center justify-center text-slate-300 gap-4 z-10 bottom-0 w-full h-[6vh] p-[1vh] text-center bg-gradient-to-r from-gray-900 to-gray-800">
            <div>Satellites: {satellites.length}</div>
            {stats}
        </div>
    );
}

export default Settings;
