import { Sidebar } from "@/components";
import { useState } from "react";

export function Test() {
    const [open, setOpen] = useState(false);
    const [openr, setOpenr] = useState(false);

    return (
        <div className="w-screen h-screen flex justify-between">
            <Sidebar.Container
                id="id"
                open={open}
                toggle={() => setOpen(!open)}
                direction="left"
            >
                <Sidebar.Btn
                    title="Item 1"
                    onClick={() => setOpen(!open)}
                    open={open}
                ></Sidebar.Btn>
            </Sidebar.Container>
            <Sidebar.Container
                id="id"
                open={openr}
                toggle={() => setOpenr(!openr)}
                direction="right"
            >
                <Sidebar.Btn
                    title="Item 1"
                    onClick={() => setOpenr(!openr)}
                    open={openr}
                ></Sidebar.Btn>
            </Sidebar.Container>
        </div>
    );
}
