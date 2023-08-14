import { IItem } from "@/context";
import { camelCaseAndNormalize } from ".";

interface IFormatModules {
    items: IItem[];
    path?: string;
    parent?: string;
}
export const formatModules = <T>({
    items,
    path,
    parent,
}: IFormatModules): T[] => {
    const itemsMenu = items;
    const menus = itemsMenu.map((item, i) => {
        const routeTitle = item?.events
            ? item.events.open
            : camelCaseAndNormalize(item.title);
        const route = item.parent
            ? `/${item.parent}/${routeTitle}`
            : path
            ? `${path}/${routeTitle}`
            : `/${routeTitle}`;

        const menu = {
            ...item,
            parent: item.parent ?? parent ?? "",
            path: routeTitle,
            route,
        } as T;
        return menu;
    });
    return menus;
};
