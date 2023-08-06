import { format, isValid } from "date-fns";
import { useCallback, useEffect } from "react";
import { IMask, useIMask } from "react-imask";
import { joinClassName } from "../../../utils";

// https://imask.js.org/guide.html#masked-pattern

type TTypeMask = "date" | "date-range";

interface IDateRange {
    startDate: Date | null;
    endDate: Date | null;
}

interface IInputMaskProps {
    mask: string;
    onChange: (e: Date | IDateRange) => void;
    value: any; //Date | IDateRange;
    type?: TTypeMask;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

const blocks = {
    yyyy: {
        mask: IMask.MaskedRange,
        from: 1900,
        to: 2100,
    },
    MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
    },
    dd: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 31,
    },
    HH: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 23,
    },
    mm: {
        mask: IMask.MaskedRange,
        from: 0,
        to: 59,
    },
};

const getObjMask = (mask: string) => ({
    date: {
        mask,
        pattern: mask,
        blocks,
        format: (date: Date) => {
            try {
                return format(date, mask);
            } catch (err) {
                return "";
            }
        },
        parse: function (str: string) {
            const yMD = str.split("/") as any;
            const parseDate = new Date(+yMD[2], +yMD[1] - 1, +yMD[0]);
            return parseDate;
        },
        min: new Date(1900, 0, 1),
        max: new Date(2100, 0, 1),
        autofix: true,
        lazy: true,
        overwrite: true,
    },
    "date-range": {
        mask: `${mask} - ${mask}`,
        pattern: `${mask} - ${mask}`,
        blocks,
        format: ({
            startDate,
            endDate,
        }: {
            startDate: Date;
            endDate: Date;
        }) => {
            let startFormat = "";
            let endFormat = "";
            try {
                startFormat = format(startDate, mask);
            } catch (err) {
                startFormat = "";
            }
            try {
                endFormat = format(endDate, mask);
            } catch (err) {
                endFormat = "";
            }
            if (startFormat || endFormat) {
                return `${startFormat}-${endFormat}`;
            }
            return "";
        },
        parse: function (str: string) {
            const yMD = str.split("/") as any;
            let startDate = null;
            let endDate = null;
            try {
                const rangeYMD = yMD[2].split("-");
                const startObj = {
                    year: +rangeYMD[0],
                    month: +yMD[1] - 1,
                    day: +yMD[0],
                };
                startDate = new Date(
                    startObj.year,
                    startObj.month,
                    startObj.day
                );
            } catch (err) {
                startDate = null;
            }
            try {
                const rangeYMD = yMD[2].split("-");
                const endObj = {
                    year: +yMD[4],
                    month: +yMD[3] - 1,
                    day: +rangeYMD[1],
                };
                endDate = new Date(endObj.year, endObj.month, endObj.day);
            } catch (err) {
                endDate = null;
            }

            return {
                startDate,
                endDate,
            };
        },
        min: new Date(1900, 0, 1),
        max: new Date(2100, 0, 1),
        autofix: true,
        lazy: true,
        overwrite: true,
        // placeholderChar: "9",
        // displayChar: "#",
    },
});

const InputMask: React.FC<IInputMaskProps> = ({
    mask,
    type = "date",
    className = "",
    value,
    onChange,
    // ...rest
}) => {
    const objConfig = getObjMask(mask)[type];
    const { ref, typedValue, setTypedValue } = useIMask<HTMLInputElement, any>(
        objConfig
    );

    const onDefaultDate = useCallback(() => {
        if (typedValue !== value) {
            setTypedValue(value);
        }
    }, [setTypedValue, typedValue, value]);

    const onDefaultDateRange = useCallback(() => {
        if (
            (value?.startDate &&
                value?.endDate &&
                typedValue?.startDate !== value.startDate) ||
            typedValue?.endDate !== value.endDate
        ) {
            setTypedValue(value);
        } else if (
            value?.startDate &&
            !value?.endDate &&
            typedValue?.startDate !== value.startDate
        ) {
            // setTypedValue(value);
        }
    }, [setTypedValue, typedValue?.endDate, typedValue?.startDate, value]);

    const onChangeDate = useCallback(() => {
        if (isValid(typedValue)) {
            onChange(typedValue);
        }
    }, [onChange, typedValue]);

    const onChangeDateRange = useCallback(() => {
        if (isValid(typedValue?.startDate) && isValid(typedValue?.endDate)) {
            onChange(typedValue);
        } else if (isValid(typedValue?.startDate)) {
            onChange({
                startDate: typedValue.startDate,
                endDate: null,
            });
        } else if (isValid(typedValue?.endDate)) {
            onChange({
                endDate: typedValue.endDate,
                startDate: null,
            });
        }
    }, [onChange, typedValue]);

    useEffect(() => {
        switch (type) {
            case "date":
                onChangeDate();
                break;
            case "date-range":
                onChangeDateRange();
                break;
            default:
                break;
        }
    }, [typedValue]);

    useEffect(() => {
        switch (type) {
            case "date":
                onDefaultDate();
                break;
            case "date-range":
                onDefaultDateRange();
                break;
            default:
                break;
        }
    }, [value]);

    return (
        <input
            ref={ref}
            inputMode="numeric"
            className={joinClassName(className)}
        />
    );
};

export { InputMask };
