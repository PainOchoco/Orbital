import { createContext } from "react";

export type Settings = {
    showSkymap: boolean;
    showAtmosphere: boolean;
    timeMultiplier: number;
};

const SettingsContext = createContext<{
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}>(null!);

export default SettingsContext;
