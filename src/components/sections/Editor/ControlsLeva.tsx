import React, { useEffect } from "react";
import { LevaPanel, useControls } from "leva";
import { StoreType } from 'leva/dist/declarations/src/types';
import { Point2D, ShapeNgon } from "@/store/api/shape-types";
import './ControlsLeva.scss';
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { levaControlsAtom } from "@/store/store";

export type LevaControlsType = {
    nOuter: number;     // Number of outer points
    nInner: number;     // Number of inner points
    outerLenghtX: number;
    outerLenghtY: number;
    innerLenghtX: number;
    innerLenghtY: number;
    // lenOuter: Point2D;  // length outer vector
    // lenInner: Point2D;  // length inner vector
    //scene: Scene;       // Scene params
    stroke: number;     // Stroke width
};

export const defLevaControls: LevaControlsType = {
    nOuter: 7,
    nInner: 4,
    outerLenghtX: 11, //scale
    outerLenghtY: 11, //scale
    innerLenghtX: 8,  //scale
    innerLenghtY: 8,  //scale
    stroke: .1,
};

export function ControlsLeva({ store }: { store?: StoreType; }) {

    const [controls, set] = useControls(
        () => ({
            nOuter: { value: defLevaControls.nOuter, min: 1, max: 100, step: 1 },
            nInner: { value: defLevaControls.nInner, min: 1, max: 100, step: 1 },
            outerLenghtX: { value: defLevaControls.outerLenghtX, min: 1, max: 100, step: 1 },
            outerLenghtY: { value: defLevaControls.outerLenghtY, min: 1, max: 100, step: 1 },
            innerLenghtX: { value: defLevaControls.innerLenghtX, min: 1, max: 100, step: 1 },
            innerLenghtY: { value: defLevaControls.innerLenghtY, min: 1, max: 100, step: 1 },
            // lenOuter: { x: 0, y: 0 },
            // lenInner: { x: 0, y: 0 },
            //scene: Scene;       // Scene params
            stroke: { value: defLevaControls.stroke, min: 1, max: 100, step: 1 },
        }),
        { store }
    );

    const setLevaControls = useUpdateAtom(levaControlsAtom);

    useEffect(() => {
        console.log('values', controls);

        const newLevaControls: LevaControlsType = {
            nOuter: controls.nOuter,
            nInner: controls.nInner,
            outerLenghtX: controls.outerLenghtX,
            outerLenghtY: controls.outerLenghtY,
            innerLenghtX: controls.innerLenghtX,
            innerLenghtY: controls.innerLenghtY,
            stroke: controls.stroke,
        };
        setLevaControls(newLevaControls);

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
