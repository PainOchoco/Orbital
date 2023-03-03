import { Switch } from "@headlessui/react";

function Toggle(props: { get: boolean; set: () => void }) {
    return (
        <Switch
            checked={props.get}
            onChange={props.set}
            className={`${props.get ? "bg-amber-600" : "bg-gray-800"}
            relative inline-flex h-9 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span
                aria-hidden="true"
                className={`${props.get ? "translate-x-7" : "translate-x-0"}
              pointer-events-none inline-block h-8 w-8 transform rounded-full bg-slate-300 shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    );
}

export default Toggle;
