import { IconProp, library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

library.add(faChevronDown, faCheck);

function Multiselect(props: {
    get: string[];
    set: React.Dispatch<React.SetStateAction<any[]>>;
    options: [string, string][];
    label: string;
    icon: IconProp;
}) {
    const { t, i18n } = useTranslation();

    return (
        <div className="w-64">
            <span className="block font-bold">{props.label}</span>
            <Listbox value={props.get} onChange={props.set} multiple>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-xl bg-gray-800 py-3 pl-12 pr-10 text-left">
                        <span className="block truncate">
                            {props.get.length
                                ? props.get.length > 2
                                    ? t("multi_select.selected", {
                                          count: props.get.length,
                                          item: props.label,
                                      })
                                    : props.get.join(", ")
                                : t("multi_select.select", { item: props.label })}
                        </span>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FontAwesomeIcon icon={props.icon} size="xl" color="#6B7280" />
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <FontAwesomeIcon icon="chevron-down" size="xl" color="#6B7280" />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                            {Object.values(props.options).map((key, i) => (
                                <Listbox.Option
                                    key={i}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 transition-colors text-gray-500 ${
                                            active ? "bg-gray-900" : ""
                                        }`
                                    }
                                    value={key[0]}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className="block truncate">
                                                {i18n.exists(key[1]) ? t(key[1]) : key[1]}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600">
                                                    <FontAwesomeIcon
                                                        icon="check"
                                                        size="xl"
                                                        color="#6B7280"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

export default Multiselect;
