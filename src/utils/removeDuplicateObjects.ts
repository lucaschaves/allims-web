export const removeDuplicateObjects = <T>(
    arr: Array<T>,
    property: string
): Array<T> => {
    const uniqueIds: T[] = [];

    const unique = arr.filter((element: any) => {
        const isDuplicate = uniqueIds.includes(element[property]);

        if (!isDuplicate) {
            uniqueIds.push(element[property]);
            return true;
        }
        return false;
    });

    return unique;
};
