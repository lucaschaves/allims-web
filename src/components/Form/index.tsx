import { BaseForm, IBaseFormRef, Sidebar } from "@/components";
import { CONSTANT_PATH } from "@/constants";
import { IItem, useMenu } from "@/context";
import { useDynamicRefs } from "@/hooks";
import {
    CalendarRange,
    Grid,
    IGridRef,
    IOnEffect,
    ISplitRef,
    Icon,
    IconButton,
    Input,
    InputSkeleton,
    List,
    OnResizeEvent,
    Popover,
    Select,
    SelectBoolean,
    Split,
    useResizeEffect,
} from "@/lib";
import { postApi } from "@/services";
import {
    formatModules,
    getDeviceType,
    joinClassName,
    removeDuplicate,
} from "@/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FieldValues, useController, useFormContext } from "react-hook-form";
import {
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import "./styles.css";

interface IFormProps {
    name: string;
    route: string;
    formData?: any;
    [key: string]: any;
}

interface ContextForm {
    buttons?: IItem[];
    openSidebar: any;
    toggleSidebar: (route: string) => void;
    openToolbar: any;
    toggleToolbar: (route: string) => void;
    formData?: any;
}

type TButtonType = "refresh";

interface IEvents {
    refresh?: string;
}

interface IButtonbar {
    title: string;
    tagId: string;
    fieldType: TButtonType;
    icon: string;
    events?: IEvents;
    // group: string;
    subgroup: string;
}

interface IFieldDefault {
    title: string;
    tagId: string;
    [key: string]: any;
}
interface IFieldGridFast extends IFieldDefault {
    fieldType?: "gridFast" | "gridView" | "gridEdit";
    gridBar?: IButtonbar[];
    isMulti?: boolean;
    onEffect?: (props: IOnEffect) => void;
}

interface IFieldText extends IFieldDefault {
    fieldType?: "text";
}

interface IFieldSelect extends IFieldDefault {
    fieldType?: "selectApi";
}

interface IFieldSelectBoolean extends IFieldDefault {
    fieldType?: "selectBoolean";
}

interface IFieldDateRange extends IFieldDefault {
    fieldType?: "dateRange";
}

type TField =
    | IFieldGridFast
    | IFieldText
    | IFieldSelect
    | IFieldDateRange
    | IFieldSelectBoolean;

type TConfig = {
    source?: string;
};

interface IForm {
    tagId: string;
    actionbar?: IButtonbar[];
    fields: TField[];
    configs: TConfig;
}

const FInput = ({ tagId, title, ...rest }: IFieldText) => {
    const { control } = useFormContext();
    const {
        field: { name, onChange, ref, value },
    } = useController({
        name: tagId,
        control,
    });

    return (
        <Input
            name={name}
            onChange={onChange}
            ref={ref}
            value={value}
            placeholder={title}
            {...rest}
        />
    );
};

const FSelect = ({ tagId, title, ...rest }: IFieldSelect) => {
    const { control } = useFormContext();
    const {
        field: { name, onChange, ref, value },
    } = useController({
        name: tagId,
        control,
    });

    return (
        <Select
            name={name}
            onChange={onChange}
            ref={ref}
            value={value}
            label={title}
            {...rest}
        />
    );
};

const FDateRange = ({ tagId, title, ...rest }: IFieldDateRange) => {
    const { control } = useFormContext();
    const {
        field: { name, onChange, ref, value },
    } = useController({
        name: tagId,
        control,
    });

    return (
        <CalendarRange
            name={name}
            onChange={onChange}
            ref={ref}
            value={value}
            label={title}
            {...rest}
        />
    );
};

const FSelectBoolean = ({ tagId, title, ...rest }: IFieldSelectBoolean) => {
    const { control } = useFormContext();
    const {
        field: { name, onChange, ref, value },
    } = useController({
        name: tagId,
        control,
    });

    return (
        <SelectBoolean
            name={name}
            onChange={onChange}
            ref={ref}
            value={value}
            label={title}
            {...rest}
        />
    );
};

const FGrid = ({ tagId, ...rest }: IFieldGridFast) => {
    const [, setRef] = useDynamicRefs();
    return <Grid ref={setRef(tagId)} tagId={tagId} {...rest} />;
};

const FormItems = ({ onEffect, fieldType = "text", ...rest }: TField) => {
    switch (fieldType) {
        case "gridFast":
        case "gridView":
        case "gridEdit":
            return <FGrid onEffect={onEffect} {...rest} />;
        case "text":
            return <FInput {...rest} />;
        case "selectApi":
            return <FSelect {...rest} />;
        case "dateRange":
            return <FDateRange {...rest} />;
        case "selectBoolean":
            return <FSelectBoolean {...rest} />;
        default:
            return <></>;
    }
};

const widthBtn = 44.3;

interface IActionbarProps {
    title: string;
    buttons?: IButtonbar[];
}

const Actionbar = (props: IActionbarProps) => {
    const { title, buttons } = props;
    const refDiv = useRef<HTMLDivElement>(null);
    const [agroup, setAgroup] = useState(false);
    const [open, setOpen] = useState(false);
    const buttonsBar = buttons ?? []; //btns
    const widthActionbar = Math.round(buttonsBar.length * widthBtn);

    const groups = removeDuplicate(
        buttonsBar.map((btn) => btn?.subgroup ?? "Ações")
    ).map((grp) => ({
        title: grp,
        btns: buttonsBar.filter((b) => b.subgroup === grp),
    }));

    const toggle = () => setOpen(!open);

    const resizeActionbar = (rect: OnResizeEvent) => {
        const { width } = rect;
        setAgroup(width <= widthActionbar ? true : false);
    };

    useResizeEffect(refDiv, resizeActionbar, []);

    return (
        <div
            className="w-full flex items-center justify-between gap-1 dark:bg-slate-950 bg-slate-200 py-1 px-2 rounded"
            ref={refDiv}
        >
            <div className="min-w-[40px] flex flex-col">
                <span className=" truncate">{title}</span>
                <span className=" truncate text-sm lowercase text-slate-600">
                    LOTE ANALÍTICO: 3303 - ENSAIO: ENSAIO TESTE ALLIMS WEB
                </span>
            </div>
            <div
                className={joinClassName(
                    "flex",
                    "items-center",
                    "justify-end",
                    "gap-1",
                    "min-h-[4rem]",
                    "h-16",
                    "divide-x",
                    "dark:divide-slate-800",
                    "divide-slate-200",
                    "overflow-auto"
                )}
            >
                {agroup ? (
                    <Popover
                        open={open}
                        onClose={() => setOpen(false)}
                        content={
                            <List.Container className="max-w-sm p-2">
                                <List.Nav>
                                    {groups.map((grp, ind, self) => (
                                        <React.Fragment key={grp.title}>
                                            <List.Group>
                                                <span className="text-xs text-slate-400 ">
                                                    {grp.title}
                                                </span>
                                                {grp.btns.map((btn) => {
                                                    return (
                                                        <List.Item
                                                            key={btn.tagId}
                                                            onClick={toggle}
                                                        >
                                                            <List.ItemPrefix>
                                                                <Icon
                                                                    name={
                                                                        btn.icon
                                                                    }
                                                                />
                                                            </List.ItemPrefix>
                                                            {btn.title}
                                                        </List.Item>
                                                    );
                                                })}
                                            </List.Group>
                                            {ind < self.length - 1 ? (
                                                <List.Divider />
                                            ) : (
                                                <></>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </List.Nav>
                            </List.Container>
                        }
                    >
                        <IconButton
                            onClick={toggle}
                            color="gray"
                            variant="text"
                        >
                            <Icon name="FiGrid" size="1.2rem" />
                        </IconButton>
                    </Popover>
                ) : (
                    groups.map((grp) => (
                        <div
                            key={grp.title}
                            className={joinClassName(
                                "flex",
                                "flex-col",
                                "items-center"
                            )}
                        >
                            <span className="text-xs text-slate-400 w-full bg-slate-300 text-center rounded">
                                {grp.title}
                            </span>
                            <div className="flex items-center justify-end gap-1">
                                {grp.btns.map((btn) => {
                                    return (
                                        <IconButton
                                            title="teste"
                                            key={btn.tagId}
                                            variant="text"
                                        >
                                            <Icon
                                                name={btn.icon}
                                                size="1.2rem"
                                            />
                                        </IconButton>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// const openToolbar = contextOutlet?.openToolbar === lastForm && contextOutlet?.openToolbar === route;

const Form = ({ name, route }: IFormProps) => {
    const isMobileAndPortrait =
        getDeviceType().device === "mobile" &&
        getDeviceType().orientation === "portrait";

    const { addMenuItems, getItemsTool } = useMenu();
    const contextOutlet = useOutletContext<ContextForm>();
    const navigate = useNavigate();
    const location = useLocation();
    const [getRef, setRef] = useDynamicRefs();

    const { formData } = contextOutlet;
    const sidebarItems = getItemsTool(route);
    const arrPath = location.pathname.split("/").filter((f) => !!f);
    const moduleActive = arrPath[0];
    const lastForm = arrPath[arrPath.length - 1];
    const penulForm = arrPath[arrPath.length - 2];

    const refSplit = useRef<ISplitRef>(null);
    const [openToolbar, setOpenToolbar] = useState(false);
    const [stateForm, setForm] = useState<IForm>();
    const [stateData, setData] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const checkPin = useCallback(
        (fix: boolean) => {
            const rightId = document.getElementById(route);
            if (fix) {
                rightId?.classList.remove(
                    "absolute",
                    "left-4",
                    "w-full",
                    lastForm === route ? "a" : "w-[calc(100%-1rem)]"
                );
                rightId?.classList.add(
                    "absolute",
                    "right-0",
                    lastForm === route ? "a" : "w-[calc(100%-1rem)]"
                );
            } else {
                rightId?.classList.remove(
                    "absolute",
                    "right-0",
                    "w-full",
                    lastForm === route ? "a" : "w-[calc(100%-1rem)]"
                );
                rightId?.classList.add(
                    "absolute",
                    "left-4",
                    lastForm === route ? "a" : "w-[calc(100%-1rem)]"
                );
            }
            refSplit.current?.reset();
        },
        [lastForm, route]
    );

    const getData = useCallback(
        async ({ path, configs }: { path: string; configs: TConfig }) => {
            try {
                setLoading(true);
                let paramsApi = {};
                if (configs.source) {
                    const refForm = getRef<IBaseFormRef>(configs.source);
                    const refGrid = getRef<IGridRef>(configs.source);
                    if (refGrid.current) {
                        paramsApi = refGrid.current.getCellFocus();
                    } else if (refForm.current) {
                        paramsApi = refForm.current.getValues();
                    }
                    setData({
                        route,
                        ...paramsApi,
                    });
                }
                const { success, data = {} } = await postApi<any>({
                    url: "/safe/data",
                    body: {
                        self: {
                            tagId: path,
                            module: moduleActive,
                            route: "values",
                            action: "list",
                            ...paramsApi,
                        },
                    },
                    config: {
                        params: {
                            r: "values",
                        },
                    },
                });
                if (success) {
                    console.log("data", data);
                }
            } catch (err) {
                console.error("getData", err);
            } finally {
                setLoading(false);
            }
        },
        [getRef, moduleActive, route]
    );

    const getForm = useCallback(
        async ({ path }: { path: string }) => {
            const { success, data } = await postApi<any>({
                url: "/safe/data",
                body: {
                    self: {
                        tagId: path,
                        module: moduleActive,
                        route: "form",
                        action: "list",
                    },
                },
                config: {
                    params: {
                        r: "form",
                    },
                },
            });
            if (success) {
                const objForm = {
                    fields: data?.main?.fields ?? [],
                    tagId: data?.main?.tagId ?? path,
                    actionbar: data?.actionBar,
                    configs: data?.configs ?? {},
                };
                setForm(objForm);
                getData({
                    path: objForm.tagId,
                    configs: objForm.configs,
                });
                const tools = formatModules<IItem>({
                    items: data.tools,
                    path: location.pathname,
                    parent: path,
                });
                addMenuItems(tools);
            }
        },
        [addMenuItems, getData, location.pathname, moduleActive]
    );

    const getOpenForm = useCallback(() => {
        const pinPath = arrPath.find((d) => d === route);
        if (pinPath === lastForm) {
            return false;
        }
        return true;
    }, [arrPath, lastForm, route]);

    const getBlur = useCallback(() => {
        const blurPath = arrPath.find((d) => d === route);
        if (blurPath === penulForm || blurPath === lastForm) {
            return false;
        }
        checkPin(true);
        return true;
    }, [arrPath, checkPin, lastForm, penulForm, route]);

    const handleSubmit = useCallback((e: FieldValues) => {
        console.log(e);
    }, []);

    const handleOpenForm = useCallback(
        ({ item }: any) => {
            let pathNavigate = item.route;
            if (item.path === lastForm) {
                const lastIndex = item.route.lastIndexOf("/");
                const newRoute = item.route.slice(0, lastIndex + 1);
                pathNavigate = newRoute;
            }
            navigate(pathNavigate);
            window.sessionStorage.setItem(CONSTANT_PATH, pathNavigate);
            // refSplit.current?.reset();
        },
        [lastForm, navigate]
    );

    const handleResizeStart = useCallback(() => {
        const idRight = document.getElementById(route);
        idRight?.classList.remove("w-[350px]");
        idRight?.classList.add("min-w-[350px]", "w-full");
    }, [route]);

    const onEffect = ({ name, value }: { name: string; value: any }) => {
        setData({
            route: name,
            ...value,
        });
    };

    useEffect(() => {
        getForm({ path: route });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route]);

    useEffect(() => {
        if (formData?.cell?.id !== stateData?.id) {
            getData({
                path: route,
                configs: { source: formData.route },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Split
            ref={refSplit}
            direction={isMobileAndPortrait ? "col" : "row"}
            hasButton={getDeviceType().device !== "desktop"}
            childrenLeft={
                <div
                    className={joinClassName(
                        "w-full",
                        "h-full",
                        "px-1",
                        "flex",
                        "flex-col",
                        "gap-2",
                        "animate-show",
                        "bg-white",
                        "dark:bg-slate-900",
                        "dark:text-slate-200",
                        getBlur() ? "blur-md" : ""
                    )}
                >
                    <Actionbar title={name} buttons={stateForm?.actionbar} />
                    <BaseForm ref={setRef(route)} onSubmit={handleSubmit}>
                        <div
                            className={joinClassName(
                                "flex",
                                "flex-col",
                                "gap-x-2",
                                "gap-y-4",
                                "p-2",
                                "overflow-auto"
                            )}
                        >
                            {loading ? (
                                <>
                                    <InputSkeleton />
                                    <InputSkeleton />
                                    <InputSkeleton />
                                    <InputSkeleton />
                                    <InputSkeleton />
                                </>
                            ) : (
                                stateForm?.fields.map((field, ind) => (
                                    <FormItems
                                        key={field.tagId ?? ind}
                                        onEffect={onEffect}
                                        {...field}
                                    />
                                ))
                            )}
                        </div>
                    </BaseForm>
                </div>
            }
            disabled={!sidebarItems.length}
            disabledResize={!getOpenForm()}
            handleResizeStart={handleResizeStart}
            childrenRight={
                <div
                    id={route}
                    className={joinClassName(
                        "h-full",
                        "flex",
                        "transition-all",
                        "animate-show",
                        "bg-white",
                        "dark:bg-slate-900",
                        getOpenForm()
                            ? "w-[350px]"
                            : sidebarItems.length
                            ? joinClassName(
                                  //   "animate-show-close-full",
                                  //   "absolute",
                                  //   "right-0",
                                  "w-16"
                              )
                            : "w-0",
                        "allims-form-fixed"
                    )}
                >
                    {sidebarItems.length ? (
                        <Sidebar.Container
                            id={`${route}-tool`}
                            open={openToolbar}
                            toggle={() =>
                                // contextOutlet?.toggleToolbar(lastForm)
                                setOpenToolbar(!openToolbar)
                            }
                            direction="right"
                        >
                            <Sidebar.Btn
                                title="Menu"
                                // onClick={(event) =>
                                //     contextOutlet?.toggleToolbar(route)
                                // }
                                onClick={() => setOpenToolbar(!openToolbar)}
                                open={openToolbar}
                                iconLeft="FiMenu"
                                direction="right"
                            />
                            {getBlur() ? (
                                <Sidebar.Btn
                                    title="Voltar"
                                    onClick={(event) =>
                                        handleOpenForm({ event, item: {} })
                                    }
                                    open={openToolbar}
                                    iconLeft="FiArrowLeft"
                                    direction="right"
                                />
                            ) : (
                                <></>
                            )}

                            {sidebarItems.map((mod: any) => (
                                <Sidebar.Btn
                                    key={mod.title}
                                    title={mod.title}
                                    onClick={(event) =>
                                        handleOpenForm({ event, item: mod })
                                    }
                                    open={openToolbar}
                                    active={
                                        !!arrPath.find((f) => f === mod.path)
                                    }
                                    iconLeft={mod.icon}
                                    direction="right"
                                />
                            ))}
                        </Sidebar.Container>
                    ) : (
                        <></>
                    )}
                    <Outlet
                        context={{
                            ...contextOutlet,
                            formData: stateData,
                        }}
                    />
                </div>
            }
        />
    );
};

export { Form };
