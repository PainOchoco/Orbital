import { useContext } from "react";
import SettingsContext from "../../contexts/SettingsContext";
import RadioTiles from "./inputs/RadioTiles";
import Toggle from "./inputs/Toggle";
import { useTranslation } from "react-i18next";

function MenuSettings() {
    const { t, i18n } = useTranslation();

    const { settings, setSettings } = useContext(SettingsContext);

    const lngs = {
        en: "English",
        fr: "Français",
    };

    return (
        <div className="py-5">
            <h1 className="text-amber-600 font-bold text-3xl">{t("menu.settings.title")}</h1>
            <div className="p-4">
                <div className="flex items-center gap-3 py-2">
                    <Toggle
                        get={settings.showSkymap}
                        set={() => {
                            setSettings({ ...settings, showSkymap: !settings.showSkymap });
                        }}
                    />
                    <p className="font-bold text-slate-300">{t("menu.settings.show_skymap")}</p>
                </div>
                <div className="flex items-center gap-3 py-2">
                    <Toggle
                        get={settings.showAtmosphere}
                        set={() => {
                            setSettings({ ...settings, showAtmosphere: !settings.showAtmosphere });
                        }}
                    />
                    <p className="font-bold text-slate-300">{t("menu.settings.show_atmosphere")}</p>
                </div>
                <div className="py-2">
                    <p className="font-bold text-slate-300 pb-2">
                        {t("menu.settings.time_multiplier")}
                    </p>
                    <RadioTiles
                        labels={["x1", "x5", "x10", "x100", "x200"]}
                        values={[1, 5, 10, 100, 200]}
                        name="multiplier"
                        get={settings.timeMultiplier}
                        set={(value) => {
                            setSettings({ ...settings, timeMultiplier: value as number });
                        }}
                    />
                </div>
                <div className="py-2">
                    <p className="font-bold text-slate-300 pb-2">{t("menu.settings.lang")}</p>
                    <div className="flex">
                        <RadioTiles
                            labels={Object.values(lngs)}
                            values={Object.keys(lngs)}
                            name="lang"
                            get={i18n.resolvedLanguage}
                            set={(value) => i18n.changeLanguage(value as string)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuSettings;
