interface TreeOption<T extends object> {
    id: keyof T;
    children: keyof T;
}

type ReType<T, K extends string> = T & { [P in K]?: ReType<T, K>[] };

export function listToTree<
    T extends object,
    C extends Pick<TreeOption<T>, "id"> & {
        parentId: keyof T;
        children: string & keyof R;
    },
    R extends ReType<T, C["children"]>
>(list: T[], options: C): R[] {
    const res: R[] = [];
    const fullMap = new Map<T[C["id"]], T>(list.map((v) => [v[options.id], v]));

    for (const node of list) {
        const parent: R = fullMap.get(node[options.parentId]) as R;
        if (parent) {
            if (!parent[options.children]) {
                parent[options.children] = [] as any;
            }
            parent[options.children]!.push(node as any);
        } else {
            res.push(node as any);
        }
    }

    return res;
}

const createChildrensPath = (routes: any[]) => {
    const data = listToTree(routes, {
        id: "path",
        parentId: "parent",
        children: "children",
    });
    return data;
};

export { createChildrensPath };
