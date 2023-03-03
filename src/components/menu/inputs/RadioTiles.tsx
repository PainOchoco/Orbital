function RadioTiles(props: {
    labels: string[];
    values: number[];
    name: string;
    get: number;
    set: (value: number) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {props.labels.map((label, i) => (
                <div key={i} className="relative h-10 w-16">
                    <input
                        type="radio"
                        id={label}
                        name={props.name}
                        className="absolute h-full w-full cursor-pointer opacity-0 peer"
                        checked={i == props.values.indexOf(props.get)}
                        onChange={() => props.set(props.values[i])}
                    />
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 font-bold peer-checked:text-slate-300 peer-checked:bg-amber-600 peer-hover:bg-gray-700 peer-checked:peer-hover:bg-amber-700 bg-gray-800 rounded-md transition-all">
                        <label htmlFor={label}>{label}</label>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RadioTiles;
