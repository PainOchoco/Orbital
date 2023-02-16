import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import { Vector2 } from "three";
import { Constants } from "../../Constants";
import SatellitesContext from "../../contexts/SatellitesContext";
import { EventEmitter, Event } from "../../events/";
import { Satellite } from "./satellite/Satellite";
import Info from "./Info";
import { OrbitControls } from "three-stdlib";
// import { Tween } from "@tweenjs/tween.js";

function Tag() {
    let satellites = useContext(SatellitesContext);
    const [pointer] = useState<Vector2>(new Vector2());
    const [onCanvas, setOnCanvas] = useState(true);
    const [hoveredSatellite, setHoveredSatellite] = useState<Satellite>(null!);
    const [focusedSatellite, setFocusedSatellite] = useState<Satellite>(null!);
    const tagRef = useRef<HTMLDivElement>(null!);
    const state = useThree();
    // const controls = useThree((state) => state.controls) as OrbitControls;
    const tagOffset = 10;

    function onMouseMove(event: MouseEvent) {
        const x = (event.clientX / state.gl.domElement.clientWidth) * 2 - 1;
        const y = -(event.clientY / state.gl.domElement.clientHeight) * 2 + 1;

        pointer.x = x;
        pointer.y = y;

        if (tagRef.current) {
            tagRef.current.style.left =
                event.clientX - state.gl.domElement.clientWidth / 2 + tagOffset / 2 + "px";
            tagRef.current.style.top =
                event.clientY - state.gl.domElement.clientHeight / 2 + tagOffset + "px";
        }
    }

    function onMouseOver(event: MouseEvent) {
        // Check if mouse is overing the canvas (to avoid getting tags in the menu)
        setOnCanvas(event.target instanceof Element && event.target.tagName == "CANVAS");
    }

    useEffect(() => {
        function onClick(event: MouseEvent) {
            if (hoveredSatellite) {
                EventEmitter.emit(Event.SATELLITE_CLICK, hoveredSatellite);
                if (event.shiftKey) {
                    EventEmitter.emit(Event.SATELLITE_SHIFT_CLICK, hoveredSatellite);
                }
            }
        }

        window.addEventListener("click", onClick);
    }, [hoveredSatellite]);

    function onSatelliteHover(satellite: Satellite) {
        setHoveredSatellite(satellite);
    }

    function onSatelliteUnhover() {
        setHoveredSatellite(null!);
    }

    function onSatelliteClick(satellite: Satellite) {
        setFocusedSatellite(satellite);
    }

    // function onSatelliteShiftClick(satellite: Satellite) {
    //     if (controls) {
    //         const pos = satellite.coordinates.position;
    //         controls.minDistance = 0;
    //         console.log(controls.target);

    //         const end = pos.clone();

    //         new Tween(controls.target).to(end, 1500).start();
    //         controls.target.set(pos.x, pos.y, pos.z);
    //     }
    // }

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseover", onMouseOver);

        EventEmitter.on(Event.SATELLITE_HOVER, onSatelliteHover);
        EventEmitter.on(Event.SATELLITE_UNHOVER, onSatelliteUnhover);
        EventEmitter.on(Event.SATELLITE_CLICK, onSatelliteClick);
    }, []);

    // useEffect(() => {
    //     EventEmitter.on(Event.SATELLITE_SHIFT_CLICK, onSatelliteShiftClick);
    // }, [controls]);

    useFrame((state) => {
        if (!pointer || !onCanvas) return;
        state.raycaster.setFromCamera(pointer, state.camera);
        const instancedMesh = state.scene.getObjectByName(Constants.SATELLITES_MESH_NAME);
        const earthMesh = state.scene.getObjectByName(Constants.EARTH_MESH_NAME);

        const intersects = state.raycaster.intersectObject(instancedMesh!);
        const earthIntersects = state.raycaster.intersectObject(earthMesh!);

        const firstIntersection = intersects[0];
        if (
            intersects.length &&
            (!earthIntersects.length || firstIntersection.distance < earthIntersects[0]?.distance)
        ) {
            const satellite = satellites[firstIntersection.instanceId!];

            if (satellite != hoveredSatellite) {
                EventEmitter.emit(Event.SATELLITE_HOVER, satellite);
                if (hoveredSatellite) {
                    EventEmitter.emit(Event.SATELLITE_UNHOVER, hoveredSatellite);
                }
            }
        } else {
            if (hoveredSatellite) {
                EventEmitter.emit(Event.SATELLITE_UNHOVER, hoveredSatellite);
            }
        }
    });

    return (
        <Html ref={tagRef}>
            <div
                className={`select-none whitespace-nowrap absolute bg-slate-700 px-2 py-1 rounded-md font-main transition-hover duration-500 ${
                    hoveredSatellite && onCanvas ? "" : "opacity-0"
                }`}
            >
                <pre className="text-amber-600 font-bold">
                    {hoveredSatellite && onCanvas ? hoveredSatellite.name : ""}
                </pre>
                {focusedSatellite && hoveredSatellite == focusedSatellite && onCanvas ? (
                    <Info satellite={focusedSatellite} />
                ) : (
                    <></>
                )}
            </div>
        </Html>
    );
}

export default Tag;
