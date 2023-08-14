import {
    ComponentProps,
    forwardRef,
    useCallback,
    useEffect,
    useState,
} from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { Button, IconButton, List, Modal } from "../../../components";
import { TTypeElement } from "../../../types";
import { joinClassName } from "../../../utils";
import { ISelectBooleanProps } from "./types";

interface IDisplayElementProps extends ComponentProps<"button"> {
    isOpen: boolean;
    typeElement: TTypeElement;
    className: string;
    label: string;
    valueDisplay: string;
    handleOpen: (open: boolean) => void;
    handleClean: () => void;
}

const DisplayElement = forwardRef<HTMLButtonElement, IDisplayElementProps>(
    (
        {
            isOpen,
            label,
            valueDisplay,
            typeElement,
            className,
            handleOpen,
            handleClean,
            ...rest
        },
        ref
    ) => {
        return (
            <div
                className={joinClassName("relative w-full min-w-[100px] h-12")}
            >
                <button
                    ref={ref}
                    type="button"
                    className={joinClassName(
                        "peer w-full h-full bg-transparent text-gray-700 font-sans font-normal text-left outline outline-0 focus:outline-0 disabled:bg-gray-50 disabled:border-0 transition-all text-sm px-5 md:px-3 py-5 md:py-2.5 rounded-[7px] border-t-transparent",
                        isOpen
                            ? "border-2 border-blue-500"
                            : "border border-gray-200",
                        className
                    )}
                    onClick={() => handleOpen(!isOpen)}
                    {...rest}
                >
                    <span
                        className={joinClassName(
                            "absolute top-2/4 -translate-y-2/4 left-3 pt-0.5"
                        )}
                    >
                        {valueDisplay}
                    </span>
                </button>
                <IconButton
                    variant="text"
                    className={joinClassName(
                        "grid place-items-center !absolute top-2/4 right-11 sm:right-14 pt-px text-gray-400 rotate-0 -translate-y-2/4 transition-all",
                        isOpen ? "rotate-180 mt-px" : ""
                    )}
                    onClick={() => handleClean()}
                >
                    <FiX />
                </IconButton>
                <IconButton
                    variant="text"
                    className={joinClassName(
                        "grid place-items-center !absolute top-2/4 right-0 pt-px text-gray-400 rotate-0 -translate-y-2/4 transition-all",
                        isOpen ? "rotate-180 mt-px" : ""
                    )}
                    onClick={() => handleOpen(!isOpen)}
                >
                    <FiChevronDown />
                </IconButton>
                <label
                    className={joinClassName(
                        'flex w-full h-full select-none pointer-events-none absolute left-0 font-normal transition-all -top-1.5 before:content[" "] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:rounded-tl-md before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[" "] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:rounded-tr-md after:pointer-events-none after:transition-all peer-disabled:after:border-transparent text-[11px] peer-disabled:text-transparent',
                        isOpen
                            ? "before:border-t-2 before:border-l-2 after:border-t-2 after:border-r-2 leading-tight text-blue-500 before:border-blue-500 after:border-blue-500"
                            : "before:border-t before:border-l after:border-t after:border-r leading-tight text-gray-400 before:border-gray-200 after:border-gray-200"
                    )}
                >
                    {label}
                </label>
            </div>
        );
    }
);

const SelectBoolean = forwardRef<HTMLButtonElement, ISelectBooleanProps>(
    (
        {
            label,
            className = "",
            error,
            success,
            variant = "outlined",
            size = "md",
            color = "blue",
            icon,
            value,
            onChange,
            typeElement = "form",
            ...rest
        },
        ref
    ) => {
        const [isOpen, setOpen] = useState(false);
        const [currSelected, setCurrSelected] = useState<boolean | null>(
            value ?? null
        );
        const [selected, setSelected] = useState<boolean | null>(value ?? null);

        const toggle = useCallback(() => {
            setOpen(!isOpen);
        }, [isOpen]);

        const handleOk = useCallback(() => {
            onChange &&
                onChange({
                    value: currSelected,
                });
            toggle();
        }, [currSelected, onChange, toggle]);

        const handleClean = useCallback(() => {
            onChange &&
                onChange({
                    value: null,
                });
            setOpen(false);
        }, [onChange]);

        const getDisplayValue = useCallback(() => {
            try {
                if (selected === true) {
                    return "sim";
                } else if (selected === false) {
                    return "não";
                }
                return "";
            } catch (err) {
                return "";
            }
        }, [selected]);

        useEffect(() => {
            setSelected(value ?? null);
            setCurrSelected(value ?? null);

            return () => {
                if (!isOpen) {
                    setSelected(value ?? null);
                    setCurrSelected(value ?? null);
                }
            };
        }, [isOpen, value]);

        const valueDisplay = getDisplayValue();

        return (
            <>
                <DisplayElement
                    valueDisplay={valueDisplay}
                    isOpen={isOpen}
                    typeElement={typeElement}
                    className={className}
                    label={label}
                    handleOpen={setOpen}
                    handleClean={handleClean}
                    {...rest}
                    ref={ref}
                />
                <Modal
                    isOpen={isOpen}
                    toggle={toggle}
                    block
                    className={joinClassName("p-4", "md:p-10")}
                >
                    <div
                        className={joinClassName(
                            "p-2",
                            "rounded",
                            "bg-white",
                            "dark:bg-slate-800",
                            "dark:text-white",
                            "text-black",
                            "flex",
                            "flex-col",
                            "gap-y-4",
                            "md:p-5",
                            "md:max-h-[400px]"
                        )}
                    >
                        <div
                            className={joinClassName(
                                "flex",
                                "items-center",
                                "justify-center",
                                "w-full"
                            )}
                        >
                            <span className="">{label}</span>
                        </div>
                        <div
                            className={joinClassName(
                                "flex",
                                "flex-col",
                                "gap-1",
                                "min-w-[250px]",
                                "font-sans",
                                "text-base",
                                "font-normal",
                                "text-gray-700",
                                "overflow-hidden",
                                className
                            )}
                        >
                            <List.Item
                                onClick={() => setCurrSelected(true)}
                                active={currSelected === true}
                            >
                                Sim
                            </List.Item>
                            <List.Item
                                onClick={() => setCurrSelected(false)}
                                active={currSelected === false}
                            >
                                Não
                            </List.Item>
                        </div>
                        <div
                            className={joinClassName(
                                "flex",
                                "items-center",
                                "justify-between"
                            )}
                        >
                            <Button
                                type="button"
                                variant="text"
                                color="gray"
                                onClick={toggle}
                            >
                                Cancelar
                            </Button>
                            <Button type="button" onClick={handleOk}>
                                Ok
                            </Button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
);

SelectBoolean.displayName = "SelectBoolean";

export { SelectBoolean };
