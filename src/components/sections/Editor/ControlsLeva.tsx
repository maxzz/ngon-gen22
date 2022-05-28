import React, { useEffect } from "react";
import { LevaPanel, useControls } from "leva";
import { StoreType } from 'leva/dist/declarations/src/types';
import { Point2D, ShapeNgon } from "@/store/api/shape-types";
import './ControlsLeva.scss';

type ControlsType = {
    nOuter: number;     // Number of outer points
    nInner: number;     // Number of inner points
    lenOuter: Point2D;  // length outer vector
    lenInner: Point2D;  // length inner vector
    //scene: Scene;       // Scene params
    stroke: number;     // Stroke width
};

export function ControlsLeva({ store }: { store?: StoreType; }) {

    const [controls, set] = useControls(
        () => ({
            nOuter: { value: 10, min: 1, max: 100, step: 1 },
            nInner: { value: 10, min: 1, max: 100, step: 1 },
            lenOuter: { x: 0, y: 0 },
            lenInner: { x: 0, y: 0 },
            //scene: Scene;       // Scene params
            stroke: { value: 10, min: 1, max: 100, step: 1 },
        }),
        { store }
    );

    useEffect(() => {
        console.log('values', controls);
                
    }, Object.values(controls));

    return (<>
        <div
            className="leva-override"
            style={{
                display: 'grid',
                width: 300,
                gap: 10,
                paddingBottom: 40,
                overflow: 'auto',
                background: '#181C20',
            }}
        >
            {/* <LevaPanel fill flat titleBar={false} store={shapeStore} /> */}
            <LevaPanel fill flat titleBar={false} store={store} />
        </div>

    </>);
}
