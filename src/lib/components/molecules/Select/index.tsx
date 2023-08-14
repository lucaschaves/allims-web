import axios from "axios";
import {
    ChangeEvent,
    ComponentProps,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { BsEraser } from "react-icons/bs";
import {
    FiCheckSquare,
    FiChevronDown,
    FiEdit,
    FiMinusSquare,
    FiMoreVertical,
    FiPlus,
    FiSearch,
    FiSquare,
    FiTrash,
    FiX,
} from "react-icons/fi";
import {
    Button,
    Checkbox,
    IconButton,
    Input,
    List,
    Modal,
    Popover,
} from "../../../components";
import { useVirtual } from "../../../hooks";
import { TTypeElement } from "../../../types";
import { calculatePage, joinClassName, useDebounceFunc } from "../../../utils";
import { ISelectProps } from "./types.d";

type TShortcut = "all" | "in" | "out";

interface LoadMore {
    startIndex: number;
    stopIndex: number;
    loadIndex: number;
    readonly scrollOffset: number;
    readonly userScroll: boolean;
    readonly total: number;
}

const TAG_ID = "amostrasFiltrosOrdemDeServico";
const MODULE = "labOnline";
const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTYxYTlkZWQtYWZhNy00YjRmLTk2ZDgtMTVjZTRmY2JjYjUyIiwiaWF0IjoxNjg2ODM4MzExLCJleHAiOjE2ODY5MjQ3MTF9.feEZR49uxOAS7P14KtAeryVA9HKh-KqYmjLdId6lR10";
const URL_LIST = "https://allims.net/api/safe/data";
const LOAD_MORE_COUNT = 10;
const LIMIT = 100;
const DEBOUNCE_TIME = 500;
const isItemLoadedArr: boolean[] = [];

interface ITotal {
    total: number;
    count: number;
}

interface ILoadData {
    url: string;
    event: LoadMore;
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    setTotal: React.Dispatch<React.SetStateAction<ITotal>>;
}

const loadData = async (props: ILoadData) => {
    const { url, event, setData, setTotal } = props;
    const { loadIndex, startIndex } = event;

    try {
        isItemLoadedArr[loadIndex] = true;

        const {
            data: { data },
        } = await axios.get(url, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                Authorization: TOKEN,
            },
        });

        setData((prev) => {
            const nextData = [...prev];
            if (prev.length > 0) {
                data.rows.forEach((dt: { id: string }) => {
                    const position = nextData.findIndex(
                        (val) => val.id == dt.id
                    );
                    nextData[position] = dt;
                });
            } else {
                data.ids.forEach((dt: string, index: number) => {
                    nextData[startIndex + index] = { id: dt };
                });
                data.rows.forEach((dt: { id: string }, index: number) => {
                    const position = nextData.findIndex(
                        (val) => val.id == dt.id
                    );
                    nextData[position >= 0 ? position : index] = dt;
                });
            }
            return nextData;
        });

        setTotal({
            total: data.total,
            count: data.ids.length,
        });
    } catch (err) {
        isItemLoadedArr[loadIndex] = false;
        loadData({
            url,
            event,
            setData,
            setTotal,
        });
    }
};

interface IListRef {
    getAllIds: () => string[];
    getNameById: (id: string) => string;
}

interface IListVirtual {
    search?: string;
    selected: string[];
    shortcut: TShortcut;
    isMulti: boolean;
    addSelected: (id: string) => void;
    removeSelected: (id: string) => void;
    handleTotal: (total: number) => void;
}

const ListVirtual = forwardRef<IListRef, IListVirtual>((props, ref) => {
    const {
        search,
        selected,
        addSelected,
        removeSelected,
        handleTotal,
        shortcut,
        isMulti,
    } = props;

    const eventLoadMoreRef = useRef<any>();
    const [isOpenList, setOpenList] = useState(-1);
    const [pages, setPages] = useState<number[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState<ITotal>({
        total: 0,
        count: 0,
    });

    const { outerRef, innerRef, items, refetch } = useVirtual<
        HTMLDivElement,
        HTMLDivElement
    >({
        itemCount: total.count > 0 ? total.count : 1000,
        itemSize: 40,
        loadMoreCount: LOAD_MORE_COUNT,
        isItemLoaded: (loadIndex) => isItemLoadedArr[loadIndex],
        loadMore: (event) => {
            eventLoadMoreRef.current = event;
            return debouncedLoadMore();
        },
        resetScroll: true,
    });

    const getParamsUrl = (page: number, count: number) => {
        let url = `${URL_LIST}?tagId=${TAG_ID}&module=${MODULE}&page=${page}&limit=${LIMIT}`;
        if (search) url += `&search=${search}`;
        if (["in", "out"].includes(shortcut)) {
            url += `&selection=${shortcut}`;
            const operation = selected.length >= count / 2;
            if (operation) {
                const ids = data
                    .filter((d) => !selected.includes(d.id))
                    .join(",");
                url += `&ids=${ids}&operation=inc`;
            } else {
                const ids = selected.join(",");
                url += `&ids=${ids}&operation=exc`;
            }
        }
        return url;
    };

    const loadMore = (event: LoadMore) => {
        const page = calculatePage(LIMIT, event.startIndex);
        if (!pages.includes(page)) {
            setPages((prev) => [...prev, page]);
            const url = getParamsUrl(page, event.total);
            return loadData({
                url,
                event,
                setData,
                setTotal,
            });
        }
    };

    const onReloadOfSearchAndShort = () => {
        setPages([]);
        setData([]);
        setTotal({
            total: 0,
            count: 0,
        });
        handleTotal(0);
        refetch();
    };

    const onChangeCheckbox = (checked: boolean, item: string) => {
        if (checked) {
            addSelected(item);
        } else {
            removeSelected(item);
        }
    };

    const handleClick = (item: string) => {
        addSelected(item);
    };

    const getAllIds = () => data.map((d) => d.id);

    const getNameById = (id: string) =>
        data?.find((d) => d.id === id)?.name || "";

    const [debouncedLoadMore] = useDebounceFunc(
        () => loadMore(eventLoadMoreRef.current),
        DEBOUNCE_TIME
    );

    useEffect(() => {
        onReloadOfSearchAndShort();
    }, [search, shortcut]);

    useEffect(() => {
        handleTotal(total.total);
    }, [total.total]);

    useImperativeHandle(
        ref,
        () => ({
            getAllIds,
            getNameById,
        }),
        [getAllIds, getNameById]
    );

    return (
        <List.Container
            ref={outerRef}
            className={joinClassName(
                "h-full",
                "w-full",
                "overflow-x-hidden",
                "overflow-auto"
            )}
        >
            <List.Nav ref={innerRef}>
                {items.map(({ index, measureRef, size }) => {
                    const item = data[index];

                    if (item && item.name) {
                        return (
                            <List.Item
                                key={item.id}
                                className={joinClassName(
                                    "gap-1 relative px-0",
                                    isMulti ? "" : "cursor-pointer"
                                )}
                                ref={measureRef}
                                active={!isMulti && selected[0] === item.id}
                                style={{
                                    height: size,
                                }}
                                onClick={() => {
                                    if (!isMulti) {
                                        handleClick(item.id);
                                    }
                                }}
                            >
                                <label
                                    className={joinClassName(
                                        "flex items-center justify-start gap-1 w-full",
                                        isMulti ? "" : "pl-3 cursor-pointer"
                                    )}
                                    htmlFor={item.id}
                                >
                                    {isMulti ? (
                                        <Checkbox
                                            id={item.id}
                                            onChange={(e) => {
                                                onChangeCheckbox(
                                                    e.target.checked,
                                                    item.id
                                                );
                                            }}
                                            checked={
                                                !!selected.find(
                                                    (s) => s === item.id
                                                )
                                            }
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    {item.name}
                                </label>
                                <List.ItemSuffix>
                                    <Popover
                                        content={
                                            <div className="p-4 rounded flex flex-col gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => ({})}
                                                    className="flex gap-2"
                                                >
                                                    <FiEdit /> Editar
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => ({})}
                                                    className="flex gap-2"
                                                >
                                                    <FiTrash /> Remover
                                                </Button>
                                            </div>
                                        }
                                        open={isOpenList === index}
                                        onClose={() => setOpenList(-1)}
                                    >
                                        <IconButton
                                            color="gray"
                                            variant="text"
                                            onClick={() => setOpenList(index)}
                                        >
                                            <FiMoreVertical />
                                            {/* <FiEdit2 /> */}
                                        </IconButton>
                                    </Popover>
                                </List.ItemSuffix>
                            </List.Item>
                        );
                    }

                    return (
                        <List.ItemSkeleton
                            key={index}
                            ref={measureRef}
                            style={{
                                height: size,
                            }}
                        />
                    );
                })}
            </List.Nav>
        </List.Container>
    );
});

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

const Select = forwardRef<HTMLButtonElement, ISelectProps>(
    (
        {
            label,
            className = "",
            isMulti = false,
            error,
            success,
            variant = "outlined",
            size = "md",
            color = "blue",
            icon,
            value,
            description,
            onChange,
            typeElement = "form",
            ...rest
        },
        ref
    ) => {
        const refList = useRef<IListRef>(null);
        const [isOpen, setOpen] = useState(false);
        const [isOpenAdd, setOpenAdd] = useState(false);
        const [searchValue, setSearchValue] = useState("");
        const [search, setSearch] = useState("");
        const [selected, setSelected] = useState<string[]>(() => {
            if (typeof value === "object") {
                return value;
            }
            if (typeof value === "string") {
                return [value];
            }
            return [];
        });
        const [total, setTotal] = useState<number>(0);
        const [shortCut, setShortcut] = useState<TShortcut>("all");

        const toggle = useCallback(() => {
            setOpen(!isOpen);
        }, [isOpen]);

        const handleOk = useCallback(() => {
            if (isMulti) {
                onChange &&
                    onChange({
                        value: selected,
                        operation: "exc",
                    });
            } else {
                onChange &&
                    onChange({
                        value: selected[0],
                        description: selected[0],
                    });
            }
            toggle();
        }, [isMulti, onChange, selected, toggle]);

        const handleChangeAll = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.checked) {
                    const ids = refList.current?.getAllIds() || [];
                    setSelected(ids);
                } else {
                    setSelected([]);
                }
            },
            []
        );

        const handleSearch = useCallback(() => {
            setSearch(searchValue);
        }, [searchValue]);

        const handleClear = useCallback(() => {
            setSearch("");
            setSearchValue("");
        }, []);

        const handleClean = useCallback(() => {
            if (isMulti) {
                onChange &&
                    onChange({
                        value: [],
                        operation: null,
                    });
            } else {
                onChange &&
                    onChange({
                        value: "",
                        description: "",
                    });
            }
            setOpen(false);
        }, [isMulti, onChange]);

        const handleAddSelected = useCallback(
            (item: string) => {
                if (isMulti) {
                    setSelected((prev) => [...prev, item]);
                } else {
                    setSelected([item]);
                }
            },
            [isMulti]
        );

        const handleRemoveSelected = useCallback((item: string) => {
            setSelected((prev) => prev.filter((p) => p !== item));
        }, []);

        const toggleAdd = useCallback(() => {
            setOpenAdd(!isOpenAdd);
        }, [isOpenAdd]);

        const handleAddSave = useCallback(() => {
            toggleAdd();
        }, [toggleAdd]);

        const getDisplayValue = useCallback(() => {
            try {
                if (description) {
                    return description;
                }
                if (isMulti) {
                    if (typeof value === "object" && value.length) {
                        return `${value.length} selecionados`;
                    }
                    return "";
                }
                if (typeof value === "object") {
                    const name =
                        refList.current?.getNameById(value[0]) || value[0];
                    return name;
                }
                if (typeof value === "string") {
                    const name = refList.current?.getNameById(value) || value;
                    return name;
                }
                return "";
            } catch (err) {
                return "";
            }
        }, [description, isMulti, value]);

        useEffect(() => {
            if (!isOpen) {
                setSelected([]);
                setTotal(0);
                setShortcut("all");
                setSearch("");
                setSearchValue("");
            }

            return () => {
                if (!isOpen) {
                    setSelected(() => {
                        if (typeof value === "object") {
                            return value;
                        }
                        if (typeof value === "string") {
                            return [value];
                        }
                        return [];
                    });
                }
            };
        }, [isOpen]);

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
                            "w-full",
                            "h-full",
                            "rounded",
                            "bg-white",
                            "dark:bg-slate-800",
                            "text-black",
                            "dark:text-white",
                            "flex",
                            "flex-col",
                            "gap-y-4",
                            "md:p-5",
                            "md:max-w-7xl",
                            "md:max-h-[800px]"
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
                        <div className="relative flex w-full">
                            <Input
                                label="Buscar"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="pr-20"
                                containerProps={{
                                    className: "min-w-0",
                                }}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) {
                                        handleSearch();
                                    }
                                }}
                            />
                            <IconButton
                                color="gray"
                                variant="text"
                                className="!absolute right-10 top-0.5 rounded text-gray-400"
                                onClick={handleSearch}
                            >
                                <FiSearch />
                            </IconButton>
                            <IconButton
                                color="gray"
                                variant="text"
                                className="!absolute right-0 top-0.5 rounded text-gray-400"
                                onClick={handleClear}
                            >
                                <BsEraser />
                            </IconButton>
                        </div>
                        <div
                            className={joinClassName(
                                "flex items-center justify-between w-full gap-2 transition",
                                "bg-gray-50",
                                "dark:bg-slate-900",
                                "text-black",
                                "dark:text-white",
                                "rounded",
                                "py-1",
                                "pr-5"
                            )}
                        >
                            {isMulti ? (
                                search.length ? (
                                    <div
                                        className={joinClassName(
                                            "flex items-center justify-start gap-2",
                                            "animate-show"
                                        )}
                                    >
                                        <label
                                            htmlFor="all"
                                            className="flex items-center"
                                        >
                                            <Checkbox
                                                id="all"
                                                // indeterminate={
                                                //     selected.length > 0 &&
                                                //     selected.length < total
                                                // }
                                                // checked={
                                                //     (selected.length > 0 &&
                                                //         selected.length <
                                                //             total) ||
                                                //     selected.length === total
                                                // }
                                                // onChange={handleChangeAll}
                                            />{" "}
                                            <span>
                                                Selecionar os 10 items filtrados
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    <div
                                        className={joinClassName(
                                            "flex items-center justify-start gap-2",
                                            "animate-show"
                                        )}
                                    >
                                        <label
                                            htmlFor="all"
                                            className="flex items-center"
                                        >
                                            <Checkbox
                                                id="all"
                                                indeterminate={
                                                    selected.length > 0 &&
                                                    selected.length < total
                                                }
                                                checked={
                                                    (selected.length > 0 &&
                                                        selected.length <
                                                            total) ||
                                                    selected.length === total
                                                }
                                                onChange={handleChangeAll}
                                            />{" "}
                                            <span>Selecionar todos</span>
                                        </label>
                                    </div>
                                )
                            ) : (
                                <div></div>
                            )}
                            <IconButton
                                variant="text"
                                onClick={toggleAdd}
                                size="sm"
                            >
                                <FiPlus className="animate-show" />
                            </IconButton>
                        </div>
                        <ListVirtual
                            ref={refList}
                            search={search}
                            selected={selected}
                            addSelected={handleAddSelected}
                            removeSelected={handleRemoveSelected}
                            handleTotal={setTotal}
                            shortcut={shortCut}
                            isMulti={isMulti}
                        />
                        <div
                            className={joinClassName(
                                "flex",
                                "items-center",
                                "justify-between",
                                "bg-gray-50",
                                "dark:bg-slate-900",
                                "text-black",
                                "dark:text-white",
                                "rounded",
                                "py-1",
                                "px-1",
                                "pl-3"
                            )}
                        >
                            <div
                                className={joinClassName(
                                    "flex",
                                    "items-center",
                                    "gap-1"
                                )}
                            >
                                <span className="text-gray-700 dark:text-white">
                                    Selecionados:
                                </span>
                                <span className="text-gray-700 dark:text-white">
                                    {selected.length}
                                </span>
                                <span className="text-gray-700 dark:text-white">
                                    /
                                </span>
                                <span className="text-gray-700 dark:text-white">
                                    {total}
                                </span>
                            </div>
                            <div
                                className={joinClassName(
                                    "flex",
                                    "items-center",
                                    "gap-2"
                                )}
                            >
                                {isMulti ? (
                                    <>
                                        <IconButton
                                            variant={
                                                shortCut === "all"
                                                    ? "filled"
                                                    : "text"
                                            }
                                            onClick={() => setShortcut("all")}
                                            size="sm"
                                        >
                                            <FiMinusSquare />
                                        </IconButton>
                                        <IconButton
                                            variant={
                                                shortCut === "out"
                                                    ? "filled"
                                                    : "text"
                                            }
                                            onClick={() => setShortcut("out")}
                                            size="sm"
                                        >
                                            <FiCheckSquare />
                                        </IconButton>
                                        <IconButton
                                            variant={
                                                shortCut === "in"
                                                    ? "filled"
                                                    : "text"
                                            }
                                            onClick={() => setShortcut("in")}
                                            size="sm"
                                        >
                                            <FiSquare />
                                        </IconButton>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
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
                <Modal
                    isOpen={isOpenAdd}
                    toggle={toggleAdd}
                    block
                    className={joinClassName("p-4", "md:p-10")}
                >
                    <div
                        className={joinClassName(
                            "p-2",
                            "w-full",
                            "h-full",
                            "rounded",
                            "bg-white",
                            "dark:bg-slate-800",
                            "text-black",
                            "dark:text-white",
                            "flex",
                            "flex-col",
                            "gap-y-4",
                            "md:p-5",
                            "md:max-w-7xl",
                            "md:max-h-[800px]"
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
                            <span className="">Adicionar</span>
                        </div>
                        <div
                            className={joinClassName(
                                "h-full",
                                "w-full",
                                "p-2",
                                "overflow-x-hidden",
                                "overflow-auto",
                                "flex",
                                "flex-col",
                                "gap-3"
                            )}
                        >
                            <Input label="Valor" />
                            <Input label="Valor 2" />
                            <Input label="Valor 3" />
                            <Input label="Valor 4" />
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
                                onClick={toggleAdd}
                            >
                                Cancelar
                            </Button>
                            <Button type="button" onClick={handleAddSave}>
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
);

Select.displayName = "Select";

export { Select };
