import { useEffect, useState } from "react";
import MenuButton from "./components/menu/MenuButton";
import { Satellite, SatelliteRaw } from "./components/scene/satellite";
import Scene from "./components/scene/Scene";
import SatellitesContext from "./contexts/SatellitesContext";
import SettingsContext, { Settings } from "./contexts/SettingsContext";
import data from "./data.json";

function App() {
    const [satellites] = useState(() => parseSatellites(data as SatelliteRaw[]));
    const [settings, setSettings] = useState<Settings>({
        showSkymap: false,
        showAtmosphere: true,
        timeMultiplier: 1,
    });

    function parseSatellites(data: SatelliteRaw[]) {
        const parsedSatellites: Satellite[] = [];
        const rawSatellites: SatelliteRaw[] = data as SatelliteRaw[];
        for (let i = 0; i < rawSatellites.length; i++) {
            parsedSatellites.push(new Satellite(rawSatellites[i]));
        }
        return parsedSatellites;
    }

    function loadSettings(settings: Settings) {
        for (const [k] of Object.entries(settings)) {
            const settingValue = localStorage.getItem(k);
            if (settingValue) {
                try {
                    (settings as any)[k] = JSON.parse(settingValue);
                } catch (err) {
                    console.error(`Setting ${k} not valid`);
                }
            }
        }
    }

    function saveSettings(settings: Settings) {
        for (const [k, v] of Object.entries(settings)) {
            localStorage.setItem(k, v.toString());
        }
    }

    useEffect(() => {
        loadSettings(settings);
    }, []);

    useEffect(() => {
        window.addEventListener("beforeunload", () => saveSettings(settings));
    }, [settings]);

    return (
        <div className="App">
            <SatellitesContext.Provider value={satellites}>
                <SettingsContext.Provider value={{ settings, setSettings }}>
                    <Scene />
                    <MenuButton />
                </SettingsContext.Provider>
            </SatellitesContext.Provider>
        </div>
    );
}

export default App;
