import { ISplitRef, Split } from "@/lib";
import { FAKER_MODULES } from "@/server";
import { getDeviceType, joinClassName } from "@/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    Outlet,
    useLocation,
    useNavigate,
    useOutletContext,
} from "react-router-dom";
import { Sidebar } from "..";
import "./styles.css";

interface IFormProps {
    name: string;
    route: string;
    [key: string]: any;
}

interface ContextForm {
    openSidebar: any;
    toggleSidebar: (route: string) => void;
    openToolbar: any;
    toggleToolbar: (route: string) => void;
}

const arrCheckForms = FAKER_MODULES.filter((f) => f.parent.length === 0).map(
    (f) => f.path
);
const CHECK_FORMS = FAKER_MODULES.filter(
    (f) => !arrCheckForms.includes(f.path)
);

const Form = ({ name, route }: IFormProps) => {
    const isMobileAndPortrait =
        getDeviceType().device === "mobile" &&
        getDeviceType().orientation === "portrait";

    const contextOutlet = useOutletContext<ContextForm>();
    const navigate = useNavigate();
    const location = useLocation();

    const arrPath = location.pathname
        .split("/")
        .filter((f) => !!f)
        .filter((f) => !arrCheckForms.includes(f));
    const lastForm = arrPath[arrPath.length - 1];
    const penulForm = arrPath[arrPath.length - 2];

    const refSplit = useRef<ISplitRef>(null);
    const [sidebarItems, setSidebarItems] = useState<any>([]);

    const checkPin = useCallback(
        (fix: boolean) => {
            const rightId = document.getElementById(route);
            if (fix) {
                rightId?.classList.remove(
                    "absolute",
                    "left-4",
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
                    lastForm === route ? "a" : "w-[calc(100%-1rem)]"
                );
                rightId?.classList.add(
                    "absolute",
                    "left-4",
                    lastForm === route ? "a" : "w-[calc(100%-1rem)]"
                );
            }
        },
        [lastForm, route]
    );

    const getSidebarSubItems = useCallback((path: string) => {
        const itemSub = CHECK_FORMS.find((v) => v.title === path);
        const itemsSide = CHECK_FORMS.filter((v) => v.parent === itemSub?.path);
        setSidebarItems(itemsSide);
    }, []);

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

    const handleOpenForm = useCallback(
        ({ item }: any) => {
            if (item.path === lastForm) {
                const lastIndex = item.route.lastIndexOf("/");
                const newRoute = item.route.slice(0, lastIndex + 1);
                navigate(newRoute);
            } else {
                navigate(item.route);
            }
        },
        [lastForm, navigate]
    );

    const handleResizeStart = useCallback(() => {
        const idRight = document.getElementById(route);
        idRight?.classList.remove("w-[350px]");
        idRight?.classList.add("min-w-[350px]", "w-full");
    }, [route]);

    useEffect(() => {
        getSidebarSubItems(name);
    }, [name]);

    const openToolbar =
        contextOutlet?.openToolbar === lastForm &&
        contextOutlet?.openToolbar === route;

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
                        "p-2",
                        "animate-show",
                        "bg-white",
                        getBlur() ? "blur-md" : ""
                    )}
                >
                    form - {name}
                </div>
            }
            disabled={!sidebarItems.length}
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
                        getOpenForm()
                            ? "w-[350px]"
                            : sidebarItems.length
                            ? "w-16"
                            : "w-0",
                        "allims-form-fixed"
                    )}
                >
                    {sidebarItems.length ? (
                        <Sidebar.Container
                            id={`${route}-tool`}
                            open={openToolbar}
                            toggle={() =>
                                contextOutlet?.toggleToolbar(lastForm)
                            }
                            direction="right"
                        >
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
                                />
                            ))}
                        </Sidebar.Container>
                    ) : (
                        <></>
                    )}
                    <Outlet context={contextOutlet} />
                </div>
            }
        />
    );
};

export { Form };
