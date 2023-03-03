import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";
import RadioTiles from "./inputs/RadioTiles";
import Toggle from "./inputs/Toggle";

function MenuSettings() {
    const { settings, setSettings } = useContext(SettingsContext);

    return (
        <div className="py-5">
            <h1 className="text-amber-600 font-bold text-3xl">Settings</h1>
            <div className="p-4">
                <div className="flex items-center gap-3 py-2">
                    <Toggle
                        get={settings.showSkymap}
                        set={() => {
                            setSettings({ ...settings, showSkymap: !settings.showSkymap });
                        }}
                    />
                    <p className="font-bold text-slate-300">Show image background</p>
                </div>
                <div className="flex items-center gap-3 py-2">
                    <Toggle
                        get={settings.showAtmosphere}
                        set={() => {
                            setSettings({ ...settings, showAtmosphere: !settings.showAtmosphere });
                        }}
                    />
                    <p className="font-bold text-slate-300">Show atmosphere</p>
                </div>
                <div className="py-2">
                    <p className="font-bold text-slate-300 pb-2">Time multiplier</p>
                    <RadioTiles
                        labels={["x1", "x5", "x10", "x100", "x200"]}
                        values={[1, 5, 10, 100, 200]}
                        name="multiplier"
                        get={settings.timeMultiplier}
                        set={(value) => {
                            setSettings({ ...settings, timeMultiplier: value });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default MenuSettings;
