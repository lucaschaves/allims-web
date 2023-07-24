import * as dateFns from "date-fns";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { joinClassName } from "../../../utils";
import { IconButton } from "../IconButton";

//https://github.com/SwapnilSoni1999/tw-daterange/blob/main/src/DateRangePicker.tsx

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
];
const years = Array.from({ length: 100 }).map((_, i) => i + 1950);

const generateCalendar = ({ month, year }: { month: number; year: number }) => {
    const startOfMonth = dateFns.startOfMonth(new Date(year, month));
    // const endOfMonth = dateFns.endOfMonth(new Date(year, month));
    const startDay = startOfMonth.getDay();
    const daysInMonth = dateFns.getDaysInMonth(startOfMonth);
    const days = [...Array(daysInMonth).keys()].map((v) => v + 1);
    const calendar = [...Array(42).keys()].map((v) => {
        if (v < startDay) {
            return null;
        }
        if (v > daysInMonth + startDay - 1) {
            return null;
        }
        return days[v - startDay];
    });
    return calendar;
};

const isBetween = (
    date: Date,
    from: Date,
    to: Date,
    inclusivity: "()" | "[]" | "(]" | "[)" = "()"
) => {
    if (!["()", "[]", "(]", "[)"].includes(inclusivity)) {
        throw new Error("Inclusivity parameter must be one of (), [], (], [)");
    }

    const isBeforeEqual = inclusivity[0] === "[",
        isAfterEqual = inclusivity[1] === "]";

    return (
        (isBeforeEqual
            ? dateFns.isEqual(from, date) || dateFns.isBefore(from, date)
            : dateFns.isBefore(from, date)) &&
        (isAfterEqual
            ? dateFns.isEqual(to, date) || dateFns.isAfter(to, date)
            : dateFns.isAfter(to, date))
    );
};

const Navigation = ({
    currMonth,
    currYear,
    handleClickPrev,
    handleClickNext,
    handleChangeMonth,
    handleChangeYear,
}: {
    currMonth: number;
    currYear: number;
    handleClickPrev: () => void;
    handleClickNext: () => void;
    handleChangeMonth: (month: number) => void;
    handleChangeYear: (year: number) => void;
}) => {
    return (
        <div className="flex justify-between items-center px-2">
            <h3 className="text-lg">
                <select
                    className="appearance-none bg-inherit px-1 capitalize"
                    value={currMonth}
                    onChange={(e) => handleChangeMonth(+e.target.value)}
                >
                    {months.map((mon, i) => (
                        <option key={mon} value={i} className="capitalize">
                            {mon}
                        </option>
                    ))}
                </select>
                <select
                    className="appearance-none bg-inherit px-1 capitalize"
                    value={currYear}
                    onChange={(e) => handleChangeYear(+e.target.value)}
                >
                    {years.map((year) => (
                        <option key={year} value={year} className="capitalize">
                            {year}
                        </option>
                    ))}
                </select>
            </h3>
            <div className="flex gap-x-2 items-center">
                <IconButton
                    variant="text"
                    color="gray"
                    onClick={handleClickPrev}
                >
                    <FiChevronLeft />
                </IconButton>
                <IconButton
                    variant="text"
                    color="gray"
                    onClick={handleClickNext}
                >
                    <FiChevronRight />
                </IconButton>
            </div>
        </div>
    );
};

const Days = ({ days }: { days: string[] }) => {
    return (
        <div className="grid grid-cols-7 p-0 sm:p-2 md:p-3 gap-2 mt-3">
            {days.map((v, i) => (
                <div key={i} className="text-center w-12">
                    {v}
                </div>
            ))}
        </div>
    );
};

const CalendarButton = ({
    className,
    handleClick,
    value,
}: {
    value: number;
    className: string;
    handleClick: () => void;
}) => {
    return (
        <button
            type="button"
            className={joinClassName(
                "rounded-lg border flex justify-center p-1.5 sm:px-4 sm:py-3 hover:bg-blue-600 hover:text-white",
                className
            )}
            onClick={handleClick}
        >
            {value}
        </button>
    );
};

interface IGetCssButtonProps {
    endCalendar: boolean;
    single: boolean;
    currYear: number;
    currMonth: number;
    dateSingle?: Date;
    dateRange?: IDateRange;
    v: number;
}

const getCssButton = (props: IGetCssButtonProps) => {
    const {
        // endCalendar,
        single,
        currYear,
        currMonth,
        dateSingle,
        dateRange,
        v,
    } = props;

    if (single) {
        return joinClassName(
            "rounded-lg border flex w-12 justify-center p-2 hover:bg-blue-600 hover:text-white",
            dateFns.isSameDay(new Date(currYear, currMonth, v), dateSingle!)
                ? "bg-blue-600 text-white"
                : "",
            dateFns.isSameDay(new Date(currYear, currMonth, v), new Date())
                ? "ring-blue-400 ring-2"
                : "",
            dateFns.isSameDay(new Date(currYear, currMonth, v), dateSingle!)
                ? "bg-blue-600 text-white"
                : "",
            isBetween(
                new Date(currYear, currMonth, v),
                dateSingle!,
                dateSingle!,
                "[]"
            )
                ? "bg-blue-200"
                : ""
        );
    }

    if (dateRange) {
        return joinClassName(
            "rounded-lg border flex w-12 justify-center p-2 hover:bg-blue-600 hover:text-white",
            dateFns.isSameDay(
                new Date(currYear, currMonth, v),
                dateRange.startDate!
            )
                ? "bg-blue-600 text-white"
                : "",
            dateFns.isSameDay(new Date(currYear, currMonth, v), new Date())
                ? "ring-blue-400 ring-2"
                : "",
            dateFns.isSameDay(
                new Date(currYear, currMonth, v),
                dateRange.endDate!
            )
                ? "bg-blue-600 text-white"
                : "",
            isBetween(
                new Date(currYear, currMonth, v),
                dateRange.startDate!,
                dateRange.endDate!,
                "[]"
            )
                ? "bg-blue-200"
                : ""
        );
    }

    return joinClassName(
        "rounded-lg border flex w-12 justify-center p-2 hover:bg-blue-600 hover:text-white"
    );
};

export interface IDateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface ICalendarProps {
    dateRange?: IDateRange;
    dateSingle?: Date;
    endCalendar?: boolean;
    className?: string;
    currCalendar: Array<number | null>;
    currYear: number;
    currMonth: number;
    handleCurrMonth: (month: number) => void;
    handleCurrYear: (year: number) => void;
    handleDateRange: (date: number) => void;
}

const Calendar = (props: ICalendarProps) => {
    const {
        dateRange,
        dateSingle,
        currCalendar,
        currYear,
        currMonth,
        handleCurrMonth,
        handleCurrYear,
        handleDateRange,
        endCalendar = false,
        className = "",
    } = props;

    return (
        <div
            className={joinClassName(
                "flex",
                "w-full h-full justify-start sm:justify-center items-start flex-col sm:flex-row min-h-[310px] sm:min-h-[430px]",
                className
            )}
        >
            <div className="min-w-[10rem] p-1 sm:p-2 md:p-3 flex flex-col">
                <Navigation
                    currMonth={currMonth}
                    currYear={currYear}
                    handleClickPrev={() => {
                        const d = dateFns.sub(new Date(currYear, currMonth), {
                            months: 1,
                        });
                        handleCurrMonth(d.getMonth());
                        handleCurrYear(d.getFullYear());
                    }}
                    handleClickNext={() => {
                        const d = dateFns.add(new Date(currYear, currMonth), {
                            months: 1,
                        });
                        handleCurrMonth(d.getMonth());
                        handleCurrYear(d.getFullYear());
                    }}
                    handleChangeMonth={handleCurrMonth}
                    handleChangeYear={handleCurrYear}
                />
                <Days days={days} />
                <div className="grid grid-cols-7 p-0 sm:p-2 md:p-3 gap-1.5">
                    {currCalendar.map((v, i) =>
                        v ? (
                            <CalendarButton
                                key={i}
                                className={getCssButton({
                                    endCalendar,
                                    single: !!dateSingle,
                                    currYear,
                                    currMonth,
                                    dateSingle,
                                    dateRange,
                                    v,
                                })}
                                handleClick={() => handleDateRange(v)}
                                value={v}
                            />
                        ) : (
                            <span key={i}></span>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export { Calendar, generateCalendar, isBetween };
