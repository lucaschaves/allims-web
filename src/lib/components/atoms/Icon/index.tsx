import * as IconsAi from "react-icons/ai";
import * as IconsBi from "react-icons/bi";
import * as IconsBs from "react-icons/bs";
import * as IconsCi from "react-icons/ci";
import * as IconsFi from "react-icons/fi";
import * as IconsGr from "react-icons/gr";
import * as IconsHi from "react-icons/hi";
import * as IconsIm from "react-icons/im";
import * as IconsIo from "react-icons/io5";
import * as IconsMd from "react-icons/md";
import * as IconsSi from "react-icons/si";
import * as IconsSl from "react-icons/sl";
import * as IconsTb from "react-icons/tb";
import * as IconsVsc from "react-icons/vsc";
import { IIconProps } from "./types.d";

const Icons = {
    Ai: IconsAi,
    Ci: IconsCi,
    Fi: IconsFi,
    Bi: IconsBi,
    Bs: IconsBs,
    Md: IconsMd,
    Im: IconsIm,
    Vsc: IconsVsc,
    Tb: IconsTb,
    Io: IconsIo,
    Sl: IconsSl,
    Si: IconsSi,
    Gr: IconsGr,
    Hi: IconsHi,
} as any;

export const Icon = (props: IIconProps) => {
    const { name, ...rest } = props;

    try {
        const subName = name.split(/(?=[A-Z])/)[0];
        const Icon = Icons[subName][name] || IconsFi.FiAirplay;
        return <Icon {...rest} />;
    } catch (err) {
        return <IconsFi.FiAirplay {...rest} />;
    }
};

Icon.displayName = "Icon";
