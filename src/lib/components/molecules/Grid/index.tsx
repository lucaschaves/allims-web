import React from "react";

const Grid = () => {
    return (
        <div className="w-full h-hull ">
            <div className="grid grid-cols-5">
                <div className="p-2">Col 1</div>
                <div className="p-2">Col 2</div>
                <div className="p-2">Col 3</div>
                <div className="p-2">Col 4</div>
                <div className="p-2">Col 5</div>
            </div>
            <div className="grid h-full max-h-[750px] grid-cols-5 overflow-auto">
                {Array.from({ length: 100 }).map((_, i) => (
                    <React.Fragment key={i}>
                        <div className="p-2">row 1-{i + 1}</div>
                        <div className="p-2">row 2-{i + 2}</div>
                        <div className="p-2">row 3-{i + 3}</div>
                        <div className="p-2">row 4-{i + 4}</div>
                        <div className="p-2">row 5-{i + 5}</div>
                    </React.Fragment>
                ))}
            </div>
            <div className="grid grid-cols-5">
                <div className="p-2">Footer 1</div>
                <div className="p-2">Footer 2</div>
                <div className="p-2">Footer 3</div>
                <div className="p-2">Footer 4</div>
                <div className="p-2">Footer 5</div>
            </div>
        </div>
    );
};

Grid.displayName = "Grid";

export { Grid };
