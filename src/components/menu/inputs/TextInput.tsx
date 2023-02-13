import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Input(props: {
    set: React.Dispatch<React.SetStateAction<any>>;
    type: string;
    icon: IconProp;
    placeholder?: string;
    label?: string;
    style?: string;
    iconColor?: string;
}) {
    return (
        <div>
            <span className="block font-bold">{props.label}</span>
            <label className="relative flex justify-center">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FontAwesomeIcon
                        icon={props.icon!}
                        size="xl"
                        color={props.iconColor ? props.iconColor : "#6B7280"}
                    />
                </span>
                <input
                    className={`block ${
                        props.style ? props.style : "bg-gray-800 placeholder:text-gray-500"
                    } rounded-xl pl-12 p-3 w-64`}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={(e) => props.set(e.target.value as any)}
                />
            </label>
        </div>
    );
}

export default Input;
