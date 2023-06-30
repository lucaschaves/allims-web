const removeProperty = (propKey: any, { [propKey]: propValue, ...rest }: any) =>
    rest;

export const removeProperties = (object: object, ...keys: any): object =>
    keys.length
        ? removeProperties(removeProperty(keys.pop(), object), ...keys)
        : object;
