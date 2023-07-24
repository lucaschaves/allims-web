type TJoinClassName<T> = { 0: T } & Array<T>;

export const joinClassName = (...args: TJoinClassName<string>) => {
    const filteredArray = args.filter((e) => e !== "");
    return filteredArray.join(" ");
};
