import { useLoaderData, useOutletContext } from "react-router-dom";

const Form = ({ name, ...rest }: any) => {
    const loaderData = useLoaderData();
    const context = useOutletContext();

    console.log("loaderData", loaderData);
    console.log(name, "rest", rest);
    console.log("context", context);

    return <div className="w-full h-full bg-red-400">form - {name}</div>;
};

export { Form };
