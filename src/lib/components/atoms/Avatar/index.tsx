import { useCallback, useState } from "react";
import { joinClassName } from "../../../utils";

interface IAvatarProps {
    src: string;
    alt: string;
}

const Avatar = (props: IAvatarProps) => {
    const { src, alt } = props;
    const [error, setError] = useState(false);

    const onError = useCallback(() => {
        setError(true);
    }, []);

    if (error) {
        return (
            <div
                className={joinClassName(
                    "flex items-center justify-center relative object-cover object-center rounded-full bg-gray-300"
                )}
            >
                {alt.length >= 2
                    ? alt.slice(0, 2).toUpperCase()
                    : alt.toUpperCase()}
            </div>
        );
    }

    return (
        <img
            className={joinClassName(
                "inline-block relative object-cover object-center rounded-full"
            )}
            src={src}
            alt={alt}
            onError={onError}
        />
    );
};

export { Avatar };
