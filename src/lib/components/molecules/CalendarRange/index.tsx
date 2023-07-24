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
    IDateRange,
    IconButton,
    InputMask,
    Modal,
    generateCalendar,
} from "../../../components";
import { TTypeElement } from "../../../types";
import { joinClassName } from "../../../utils";
import { ICalendarRangeProps } from "./types.d";

//https://github.com/SwapnilSoni1999/tw-daterange/blob/main/src/DateRangePicker.tsx

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
        typeElement,
        className,
        handleOpen,
        handleClean,
        onChangeDisplay,
        // ...rest
    } = props;
    if (typeElement === "column") {
        return (
            <div
                className={joinClassName("relative w-full min-w-[100px] h-12")}
            >
                <InputMask
                    mask="dd/MM/yyyy"
                    type="date-range"
                    value={valueDisplay}
                    onChange={onChangeDisplay}
                    className={joinClassName(
                        "peer w-full h-full rounded-none bg-transparent text-gray-700 font-sans font-normal text-left outline outline-0",
                        "focus:outline-0",
                        "disabled:bg-gray-50 disabled:border-0 transition-all text-sm px-3 md:px-3 py-5 md:py-2.5",
                        isOpen
                            ? "border-2 border-blue-500"
                            : "border border-gray-200",
                        className,
                        "focus:border-2 focus:border-blue-500"
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
            </div>
        );
    }
    if (typeElement === "cell") {
        return (
            <div
                className={joinClassName("relative w-full min-w-[100px] h-12")}
            >
                <InputMask
                    mask="dd/MM/yyyy"
                    type="date-range"
                    value={valueDisplay}
                    onChange={onChangeDisplay}
                    className={joinClassName(
                        "peer w-full h-full rounded-none bg-transparent text-gray-700 font-sans font-normal text-left outline outline-0",
                        "focus:outline-0",
                        "disabled:bg-gray-50 disabled:border-0 transition-all text-sm px-3 md:px-3 py-5 md:py-2.5",
                        isOpen
                            ? "border-2 border-blue-500"
                            : "border border-gray-200",
                        className,
                        "focus:border-2 focus:border-blue-500"
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
            </div>
        );
    }
    return (
        <div className={joinClassName("relative w-full min-w-[100px] h-12")}>
            <InputMask
                mask="dd/MM/yyyy"
                type="date-range"
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

const CalendarRange = forwardRef<HTMLInputElement, ICalendarRangeProps>(
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
        const [dateRange, setDateRange] = useState<IDateRange>({
            startDate: value?.startDate ?? null,
            endDate: value?.endDate ?? null,
        });

        /** Date Range */
        const [isOpen, setOpen] = useState(false);
        const [currCalendar, setCurrCalendar] = useState<Array<number | null>>(
            []
        );
        const [nextCalendar, setNextCalendar] = useState<Array<number | null>>(
            []
        );
        const [currMonth, setCurrMonth] = useState<number>(
            new Date().getMonth()
        );
        const [currMonthEnd, setCurrMonthEnd] = useState<number>(
            dateFns.add(new Date(), { months: 1 }).getMonth()
        );
        const [currYear, setCurrYear] = useState<number>(
            new Date().getFullYear()
        );
        const [currYearEnd, setCurrYearEnd] = useState<number>(
            dateFns.add(new Date(), { months: 1 }).getFullYear()
        );
        const [currDateRange, setCurrDateRange] = useState<IDateRange>({
            startDate: value?.startDate ?? null,
            endDate: value?.endDate ?? null,
        });

        const toggle = useCallback(() => {
            setOpen(!isOpen);
        }, [isOpen]);

        const handleCancel = useCallback(() => {
            setCurrDateRange(currDateRange);
            setDateRange(currDateRange);
            toggle();
        }, [currDateRange, toggle]);

        const handleOk = useCallback(() => {
            const startEndChange = {
                startDate: dateRange.startDate,
                endDate: dateRange?.endDate ?? dateRange.startDate,
            };
            onChange && onChange(startEndChange);
            onChangeDisplay(startEndChange);
            toggle();
        }, [dateRange, onChange, toggle]);

        const handleStart = useCallback(() => {
            const startChange = {
                startDate: dateRange.startDate,
                endDate: null,
            };
            onChange && onChange(startChange);
            onChangeDisplay(startChange);
            toggle();
        }, [dateRange, onChange, toggle]);

        const handleEnd = useCallback(() => {
            const endChange = {
                endDate: dateRange.startDate,
                startDate: null,
            };
            onChange && onChange(endChange);
            onChangeDisplay(endChange);
            toggle();
        }, [dateRange, onChange, toggle]);

        const handleBetweenDays = useCallback((days: number) => {
            const currStartDate = dateFns.sub(new Date(), { days: days });
            setDateRange({
                startDate: currStartDate,
                endDate: new Date(),
            });
            setCurrMonth(currStartDate.getMonth());
            setCurrYear(currStartDate.getFullYear());
            const dateCurrEnd = dateFns.add(currStartDate, { months: 1 });
            setCurrMonthEnd(dateCurrEnd.getMonth());
            setCurrYearEnd(dateCurrEnd.getFullYear());
        }, []);

        const handleClean = useCallback(() => {
            onChange &&
                onChange({
                    startDate: null,
                    endDate: null,
                });
            setCurrDateRange({ startDate: null, endDate: null });
            setDateRange({ startDate: null, endDate: null });
        }, [onChange]);

        const onChangeDisplay = useCallback((val: any) => {
            const startDateDisplay = val?.startDate
                ? (val.startDate as Date)
                : null;
            const endDateDisplay = val?.endDate ? (val.endDate as Date) : null;

            setCurrDateRange(val);
            setDateRange(val);
            if (startDateDisplay) {
                setCurrMonth(startDateDisplay.getMonth());
                setCurrYear(startDateDisplay.getFullYear());
            }
            if (endDateDisplay) {
                setCurrMonthEnd(endDateDisplay.getMonth());
                setCurrYearEnd(endDateDisplay.getFullYear());
            }
        }, []);

        const getGenerateNextCalendar = useCallback(() => {
            const currNextCalendarInit = {
                month: new Date(currYearEnd, currMonthEnd).getMonth(),
                year: new Date(currYearEnd, currMonthEnd).getFullYear(),
            };
            const _nextCurrCalendar = generateCalendar(currNextCalendarInit);
            setNextCalendar(_nextCurrCalendar);
        }, [currMonthEnd, currYearEnd]);

        const getGenerateCurrCalendar = useCallback(() => {
            const _currCalendar = generateCalendar({
                month: new Date(currYear, currMonth).getMonth(),
                year: new Date(currYear, currMonth).getFullYear(),
            });
            setCurrCalendar(_currCalendar);
            if (currYear > currYearEnd) {
                setCurrYearEnd(currYear);
            }
            if (currMonth >= currMonthEnd && currYear === currYearEnd) {
                const newMonth = currMonth + 1;
                if (newMonth === 11) {
                    setCurrMonthEnd(0);
                    setCurrYearEnd(currYear + 1);
                } else {
                    setCurrMonthEnd(newMonth);
                }
            }
        }, [currMonth, currMonthEnd, currYear, currYearEnd]);

        useEffect(() => {
            getGenerateCurrCalendar();
        }, [currMonth, currYear, getGenerateCurrCalendar]);

        useEffect(() => {
            getGenerateNextCalendar();
        }, [currMonthEnd, currYearEnd, getGenerateNextCalendar]);

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
                        <div className="flex w-full h-full justify-start sm:justify-center items-start flex-col sm:flex-row min-h-[310px] sm:min-h-[450px]">
                            <Calendar
                                dateRange={dateRange}
                                currCalendar={currCalendar}
                                currYear={currYear}
                                currMonth={currMonth}
                                handleCurrMonth={setCurrMonth}
                                handleCurrYear={setCurrYear}
                                handleDateRange={(v) => {
                                    const dateRangeActual = new Date(
                                        currYear,
                                        currMonth,
                                        v
                                    );
                                    if (!dateRange.startDate) {
                                        setDateRange((d) => ({
                                            ...d,
                                            startDate: dateRangeActual,
                                        }));
                                    }
                                    if (
                                        dateRange.startDate &&
                                        !dateRange.endDate
                                    ) {
                                        if (
                                            dateRangeActual.getDay() <
                                            dateRange.startDate.getDay()
                                        ) {
                                            setDateRange({
                                                startDate: dateRangeActual,
                                                endDate: null,
                                            });
                                        } else {
                                            setDateRange((d) => ({
                                                ...d,
                                                endDate: dateRangeActual,
                                            }));
                                        }
                                    }
                                    if (
                                        dateRange.startDate &&
                                        dateRange.endDate
                                    ) {
                                        setDateRange({
                                            startDate: dateRangeActual,
                                            endDate: null,
                                        });
                                    }
                                }}
                            />
                            <Calendar
                                endCalendar
                                className="hidden sm:flex"
                                dateRange={dateRange}
                                currCalendar={nextCalendar}
                                currYear={currYearEnd}
                                currMonth={currMonthEnd}
                                handleCurrMonth={setCurrMonthEnd}
                                handleCurrYear={setCurrYearEnd}
                                handleDateRange={(v) => {
                                    const dateRangeActual = new Date(
                                        currYearEnd,
                                        currMonthEnd,
                                        v
                                    );
                                    if (!dateRange.startDate) {
                                        setDateRange((d) => ({
                                            ...d,
                                            startDate: dateRangeActual,
                                        }));
                                    }
                                    if (
                                        dateRange.startDate &&
                                        !dateRange.endDate
                                    ) {
                                        setDateRange((d) => ({
                                            ...d,
                                            endDate: dateRangeActual,
                                        }));
                                    }
                                    if (
                                        dateRange.startDate &&
                                        dateRange.endDate
                                    ) {
                                        setDateRange({
                                            startDate: dateRangeActual,
                                            endDate: null,
                                        });
                                    }
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between w-full px-2 pl-7 h-3">
                            <span className="text-sm text-gray-500">
                                {dateRange?.startDate
                                    ? dateFns.format(
                                          dateRange.startDate,
                                          "dd/MM/yyyy"
                                      )
                                    : "-"}
                            </span>
                            <span className="text-sm text-gray-500">
                                {dateRange?.endDate
                                    ? dateFns.format(
                                          dateRange.endDate,
                                          "dd/MM/yyyy"
                                      )
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
                                Última semana
                            </Button>
                            <Button
                                variant="text"
                                size="sm"
                                color="gray"
                                onClick={() => handleBetweenDays(30)}
                            >
                                Último mês
                            </Button>
                            <Button
                                variant="text"
                                size="sm"
                                color="gray"
                                onClick={() => handleBetweenDays(365)}
                            >
                                Último ano
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
                            <div
                                className={joinClassName(
                                    "flex",
                                    "items-center",
                                    "justify-end",
                                    "gap-1"
                                )}
                            >
                                <Button
                                    type="button"
                                    variant="text"
                                    onClick={handleStart}
                                >
                                    A partir
                                </Button>
                                <Button
                                    type="button"
                                    variant="text"
                                    onClick={handleEnd}
                                >
                                    Até
                                </Button>
                                <Button type="button" onClick={handleOk}>
                                    Ok
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
);

CalendarRange.displayName = "CalendarRange";

export { CalendarRange };
