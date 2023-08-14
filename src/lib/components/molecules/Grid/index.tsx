import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";

interface IGridRef {
    getCellFocus: () => any;
    getRowFocus: () => any;
}

export interface IOnEffect {
    name: string;
    value: {
        cell?: any;
        row?: any;
        indexCol?: number;
        indexRol?: number;
    };
}

interface IGridProps {
    tagId: string;
    name?: string;
    onEffect?: (props: IOnEffect) => void;
}

const Grid = forwardRef<IGridRef, IGridProps>(
    ({ tagId, name = "", onEffect = () => ({}) }, ref) => {
        const [cell, setCell] = useState<any>({
            id: 2,
            data: {
                module: "ensaios",
            },
        });
        const [row, setRow] = useState<any>({});

        const handleCell = useCallback(() => {
            const valueCell =
                cell?.id === 1
                    ? {
                          id: 2,
                          data: {
                              module: "ensaios",
                          },
                      }
                    : {
                          id: 1,
                          data: {
                              module: "ensaios",
                          },
                      };
            setCell(valueCell);
            onEffect({
                name: tagId,
                value: {
                    cell: valueCell,
                },
            });
        }, [cell?.id, tagId, onEffect]);

        const getCellFocus = useCallback(() => {
            return cell;
        }, [cell]);

        const getRowFocus = useCallback(() => {
            return row;
        }, [row]);

        useImperativeHandle(
            ref,
            () => ({
                getRowFocus,
                getCellFocus,
            }),
            [getCellFocus, getRowFocus]
        );

        return (
            <div className="w-full h-hull dark:text-slate-200">
                <div className="grid grid-cols-5">
                    <div className="p-2">Col 1</div>
                    <div className="p-2">Col 2</div>
                    <div className="p-2">Col 3</div>
                    <div className="p-2">Col 4</div>
                    <div className="p-2">Col 5</div>
                </div>
                <div className="grid h-full max-h-[750px] grid-cols-5 overflow-auto">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <React.Fragment key={i}>
                            <div className="p-2" onClick={handleCell}>
                                click cell {i}-{i + 1}
                            </div>
                            <div className="p-2">
                                row {i}-{i + 2}
                            </div>
                            <div className="p-2">
                                row {i}-{i + 3}
                            </div>
                            <div className="p-2">
                                row {i}-{i + 4}
                            </div>
                            <div className="p-2">
                                row {i}-{i + 5}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className="grid grid-cols-5">
                    <div className="p-2">Footer 1</div>
                    <div className="p-2">Footer 2</div>
                    <div className="p-2">Footer 3</div>
                    <div className="p-2">Footer 4</div>
                    <div className="p-2">Footer 5</div>
                </div>
            </div>
        );
    }
);

Grid.displayName = "Grid";

export { Grid };
export type { IGridRef };
