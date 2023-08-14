export const removeDuplicate = <T>(arr: Array<T>): Array<T> => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
};
