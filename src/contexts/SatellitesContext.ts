import { createContext } from "react";
import { Satellite } from "../components/scene/satellite/Satellite";

const SatellitesContext = createContext(new Array<Satellite>());

export default SatellitesContext;
