import { useState } from "react";
import "./App.css";
import MenuButton from "./components/menu/MenuButton";
import { Satellite, SatelliteRaw } from "./components/scene/satellite";
import Scene from "./components/scene/Scene";
import SatellitesContext from "./contexts/SatellitesContext";
import data from "./data.json";

function App() {
    const [satellites, setSatellites] = useState(new Array<Satellite>());

    const rawSatellites: SatelliteRaw[] = data as SatelliteRaw[];
    for (let i = 0; i < rawSatellites.length; i++) {
        satellites.push(new Satellite(rawSatellites[i]));
    }
    return (
        <div className="App">
            <SatellitesContext.Provider value={satellites}>
                <Scene />
                <MenuButton />
            </SatellitesContext.Provider>
        </div>
    );
}

export default App;
