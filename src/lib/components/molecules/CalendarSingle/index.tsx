import * as dateFns from "date-fns";
import {
    ComponentProps,
    forwardRef,
    useCallback,
    useEffect,
    useState,
} from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import {
    Button,
    Calendar,
    IconButton,
    InputMask,
    Modal,
    generateCalendar,
} from "../../../components";
import { TTypeElement } from "../../../types";
import { joinClassName } from "../../../utils";
import { ICalendarSingleProps } from "./types";

interface IDisplayElementProps extends ComponentProps<"input"> {
    isOpen: boolean;
    typeElement: TTypeElement;
    className: string;
    label: string;
    valueDisplay: any;
    onChangeDisplay: (value: any) => void;
    handleOpen: (open: boolean) => void;
    handleClean: () => void;
}

const DisplayElement = (props: IDisplayElementProps) => {
    const {
        isOpen,
        label,
        valueDisplay,
        // typeElement,
        className,
        handleOpen,
        handleClean,
        onChangeDisplay,
        // ...rest
    } = props;

    return (
        <div className={joinClassName("relative w-full min-w-[100px] h-12")}>
            <InputMask
                mask="dd/MM/yyyy"
                type="date"
                value={valueDisplay}
                onChange={onChangeDisplay}
                className={joinClassName(
                    "peer w-full h-full bg-transparent text-gray-700 font-sans font-normal text-left outline outline-0",
                    "focus:outline-0",
                    "disabled:bg-gray-50 disabled:border-0 transition-all text-sm px-3 md:px-3 py-5 md:py-2.5 rounded-[7px] border-t-transparent",
                    isOpen
                        ? "border-2 border-blue-500"
                        : "border border-gray-200",
                    className,
                    "focus:border-2 focus:border-blue-500 focus:border-t-transparent"
                )}
            />
            <IconButton
                variant="text"
                className={joinClassName(
                    "grid place-items-center !absolute top-2/4 right-11 sm:right-14 pt-px text-gray-400 rotate-0 -translate-y-2/4 transition-all",
                    isOpen ? "rotate-180 mt-px" : ""
                )}
                onClick={handleClean}
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
                    'flex w-full h-full select-none pointer-events-none absolute left-0 font-normal transition-all -top-1.5 before:content[" "] before:block',
                    "before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:rounded-tl-md before:pointer-events-none",
                    'before:transition-all peer-disabled:before:border-transparent after:content[" "] after:block after:flex-grow after:box-border',
                    "after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:rounded-tr-md after:pointer-events-none after:transition-all",
                    "peer-disabled:after:border-transparent text-[11px] peer-disabled:text-transparent",
                    isOpen
                        ? "before:border-t-2 before:border-l-2 after:border-t-2 after:border-r-2 leading-tight text-blue-500 before:border-blue-500 after:border-blue-500"
                        : "before:border-t before:border-l after:border-t after:border-r leading-tight text-gray-400 before:border-gray-200 after:border-gray-200",
                    "peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:after:border-t-2 peer-focus:after:border-r-2",
                    "peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-blue-500 peer-focus:after:border-blue-500"
                )}
            >
                {label}
            </label>
        </div>
    );
};

const CalendarSingle = forwardRef<HTMLInputElement, ICalendarSingleProps>(
    (
        {
            label,
            className = "",
            variant = "outlined",
            size = "md",
            color = "blue",
            value,
            onChange,
            typeElement = "form",
            ...rest
        },
        ref
    ) => {
        const [dateRange, setDateRange] = useState<Date | null>(value ?? null);

        /**Date */
        const [isOpen, setOpen] = useState(false);
        const [currCalendar, setCurrCalendar] = useState<Array<number | null>>(
            []
        );
        const [currMonth, setCurrMonth] = useState<number>(
            new Date().getMonth()
        );
        const [currYear, setCurrYear] = useState<number>(
            new Date().getFullYear()
        );

        const [currDateRange, setCurrDateRange] = useState<Date | null>(
            value ?? null
        );

        const toggle = useCallback(() => {
            setOpen(!isOpen);
        }, [isOpen]);

        const handleCancel = useCallback(() => {
            setCurrDateRange(currDateRange);
            setDateRange(currDateRange);
            toggle();
        }, [currDateRange, toggle]);

        const handleOk = useCallback(() => {
            onChange && onChange(dateRange);
            onChangeDisplay(dateRange);
            toggle();
        }, [dateRange, onChange, toggle]);

        const handleBetweenDays = useCallback((days: number) => {
            const dateNew = dateFns.sub(new Date(), { days: days });
            setDateRange(dateNew);
            setCurrMonth(dateNew.getMonth());
            setCurrYear(dateNew.getFullYear());
        }, []);

        const handleClean = useCallback(() => {
            onChange && onChange(null);
            setCurrDateRange(null);
            setDateRange(null);
        }, [onChange]);

        const onChangeDisplay = useCallback((val: any) => {
            const dateDisplay = val ? (val as Date) : null;

            setCurrDateRange(val);
            setDateRange(val);
            if (dateDisplay) {
                setCurrMonth(dateDisplay.getMonth());
                setCurrYear(dateDisplay.getFullYear());
            }
        }, []);

        const getGenerateCurrCalendar = useCallback(() => {
            const _currCalendar = generateCalendar({
                month: new Date(currYear, currMonth).getMonth(),
                year: new Date(currYear, currMonth).getFullYear(),
            });
            setCurrCalendar(_currCalendar);
        }, [currMonth, currYear]);

        useEffect(() => {
            getGenerateCurrCalendar();
        }, [currMonth, currYear]);

        return (
            <>
                <DisplayElement
                    valueDisplay={currDateRange}
                    isOpen={isOpen}
                    typeElement={typeElement}
                    className={className}
                    label={label}
                    handleOpen={setOpen}
                    handleClean={handleClean}
                    onChangeDisplay={onChangeDisplay}
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
                            "flex",
                            "flex-col",
                            "justify-between",
                            "gap-y-4",
                            "md:p-5"
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
                        <Calendar
                            dateSingle={dateRange ?? undefined}
                            currCalendar={currCalendar}
                            currYear={currYear}
                            currMonth={currMonth}
                            handleCurrMonth={setCurrMonth}
                            handleCurrYear={setCurrYear}
                            handleDateRange={(v) => {
                                setDateRange(new Date(currYear, currMonth, v));
                            }}
                        />
                        <div className="flex items-center justify-start w-full px-2 pl-7 h-3">
                            <span className="text-sm text-gray-500">
                                {dateRange
                                    ? dateFns.format(dateRange, "dd/MM/yyyy")
                                    : "-"}
                            </span>
                        </div>
                        <div className="flex items-center justify-start w-full bg-gray-50 p-2 rounded">
                            <Button
                                variant="text"
                                size="sm"
                                color="gray"
                                onClick={() => handleBetweenDays(0)}
                            >
                                Hoje
                            </Button>
                            <Button
                                variant="text"
                                size="sm"
                                color="gray"
                                onClick={() => handleBetweenDays(7)}
                            >
                                Semana anterior
                            </Button>
                            <Button
                                variant="text"
                                size="sm"
                                color="gray"
                                onClick={() => handleBetweenDays(30)}
                            >
                                Mês anterior
                            </Button>
                            <Button
                                variant="text"
                                size="sm"
                                color="gray"
                                onClick={() => handleBetweenDays(365)}
                            >
                                Ano anterior
                            </Button>
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
                                onClick={handleCancel}
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

CalendarSingle.displayName = "CalendarSingle";

export { CalendarSingle };
