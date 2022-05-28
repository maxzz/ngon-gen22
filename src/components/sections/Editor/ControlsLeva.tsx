import React from "react";
import { useControls } from "leva";
import { StoreType } from 'leva/dist/declarations/src/types';
import { Point2D, ShapeNgon } from "@/store/api/shape-types";

type ControlsType = {
    nOuter: number;     // Number of outer points
    nInner: number;     // Number of inner points
    lenOuter: Point2D;  // length outer vector
    lenInner: Point2D;  // length inner vector
    //scene: Scene;       // Scene params
    stroke: number;     // Stroke width
};

export function ControlsLeva({ store, children }: { store?: StoreType; children: JSX.Element; }) {
    
    const controls: ControlsType = useControls(
        {
            nOuter: 10,
            nInner: 10,
            lenOuter: { x: 0, y: 0 },
            lenInner: { x: 0, y: 0 },
            //scene: Scene;       // Scene params
            stroke: 10,
        },
        { store }
    );

    return (<>
        {React.cloneElement(children, { store })}
    </>);
}
