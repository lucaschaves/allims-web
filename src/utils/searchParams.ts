interface ISearchParamsProps {
    [key: string]: string | number | boolean;
}

export const SearchParams = (props: ISearchParamsProps) => {
    let urlParams = {};
    Object.keys(props).forEach((key) => {
        urlParams = {
            ...urlParams,
            [key]: props[key].toString(),
        };
    });
    const params = new URLSearchParams(urlParams);
    return params.toString();
};
