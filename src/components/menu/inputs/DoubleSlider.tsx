import "./DoubleSlider.css";
import { useRef, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DoubleSlider(props: {
    icon: IconProp;
    label: string;
    set: React.Dispatch<React.SetStateAction<[number, number]>>;
    get: [number, number];
    min: number;
    max: number;
}) {
    const sliderOne = useRef<HTMLInputElement>(null!);
    const sliderTwo = useRef<HTMLInputElement>(null!);
    const sliderTrack = useRef<HTMLDivElement>(null!);
    const [values, setValues] = useState<[number, number]>([0, 100]);

    const minGap = 2;

    function clamp(percentage: number): number {
        return props.min + percentage * (props.max - props.min);
    }

    function slideOne() {
        if (parseInt(sliderTwo.current.value) - parseInt(sliderOne.current.value) <= minGap) {
            sliderOne.current.value = (parseInt(sliderTwo.current.value) - minGap).toString();
        }

        props.set((v) => [clamp(parseInt(sliderOne.current.value) / 100), v[1]]);
        setValues((v) => [parseInt(sliderOne.current.value), v[1]]);
        fillColor();
    }
    function slideTwo() {
        if (parseInt(sliderTwo.current.value) - parseInt(sliderOne.current.value) <= minGap) {
            sliderTwo.current.value = (parseInt(sliderOne.current.value) + minGap).toString();
        }

        props.set((v) => [v[0], clamp(parseInt(sliderTwo.current.value) / 100)]);
        setValues((v) => [v[0], parseInt(sliderTwo.current.value)]);
        fillColor();
    }

    function fillColor() {
        const sliderMaxValue = parseInt(sliderOne.current.max);

        const percent1 = (parseInt(sliderOne.current.value) / sliderMaxValue) * 100;
        const percent2 = (parseInt(sliderTwo.current.value) / sliderMaxValue) * 100;

        sliderTrack.current.style.background = `linear-gradient(to right, #1f2937 ${percent1}% , #d97706 ${percent1}% , #d97706 ${percent2}%, #1f2937 ${percent2}%)`;
    }

    return (
        <>
            <p className="w-16 mt-12 text-center hidden sm:block">{props.get[0].toFixed(3)}</p>
            <div className="w-64 box-border relative">
                <FontAwesomeIcon icon={props.icon!} size="xl" color="#6B7280" />
                <span className="block font-bold pb-3">{props.label}</span>
                <label className="relative flex justify-center">
                    <div ref={sliderTrack} className="slider-track"></div>
                    <input
                        ref={sliderOne}
                        type="range"
                        onInput={slideOne}
                        max={100}
                        value={values[0]}
                    />
                    <input
                        ref={sliderTwo}
                        type="range"
                        onInput={slideTwo}
                        max={100}
                        value={values[1]}
                    />
                </label>
            </div>
            <p className="w-16 mt-12 text-center hidden sm:block">{props.get[1].toFixed(2)}</p>
        </>
    );
}

export default DoubleSlider;
