import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Menu from "./Menu";

library.add(faBars);

function MenuButton() {
    const [isOpened, setOpen] = useState(false);

    function toggle() {
        setOpen(!isOpened);
    }

    function onEscape(event: KeyboardEvent) {
        if (event.key == "Escape") setOpen((o) => !o);
    }

    useEffect(() => {
        window.addEventListener("keydown", onEscape);
    }, []);

    return (
        <nav className="fixed top-0 right-0 text-white">
            <button
                className={`m-3 p-3 bg-slate-700 hover:bg-gray-800 transition-all rounded-md ${
                    isOpened ? "invisible" : ""
                }`}
                onClick={toggle}
            >
                <FontAwesomeIcon icon="bars" size="xl" color="#6B7280" />
            </button>
            <Menu opened={isOpened} toggle={toggle} />
        </nav>
    );
}

export default MenuButton;
