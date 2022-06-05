import React, { useEffect } from "react";
import { LevaPanel, useControls } from "leva";
import { StoreType } from 'leva/dist/declarations/src/types';
import { Point2D, ShapeNgon } from "@/store/api/shape-types";
import './ControlsLeva.scss';
import { useAtom } from "jotai";
import { useUpdateAtom } from "jotai/utils";
import { levaControlsAtom, paramAtom } from "@/store/store";

export type LevaControlsType = {
    nOuter: number;     // Number of outer points
    nInner: number;     // Number of inner points
    outerX: number;     // outer lenght x
    outerY: number;     // outer lenght y
    innerX: number;     // inner lenght x
    innerY: number;     // inner lenght y
    // lenOuter: Point2D;  // length outer vector
    // lenInner: Point2D;  // length inner vector
    //scene: Scene;       // Scene params
    stroke: number;     // Stroke width
};

export const defLevaControls: LevaControlsType = {
    nOuter: 5,
    nInner: 4,
    outerX: 11, //scale
    outerY: 11, //scale
    innerX: 8,  //scale
    innerY: 8,  //scale
    stroke: .1,
};

export function ControlsLeva({ store }: { store?: StoreType; }) {

    console.log('render');

    /*1* /
    const [controls, set] = useControls(
        // () => ({
        //     nOuter: { label: '# outer points', value: defLevaControls.nOuter, min: 1, max: 100, step: 1 },
        //     nInner: { label: '# inner points', value: defLevaControls.nInner, min: 1, max: 100, step: 1 },
        //     outerX: { label: 'outer scale X', value: defLevaControls.outerX, min: -100, max: 100, step: 1 },
        //     outerY: { label: 'outer scale Y', value: defLevaControls.outerY, min: -100, max: 100, step: 1 },
        //     innerX: { label: 'inner scale X', value: defLevaControls.innerX, min: -100, max: 100, step: 1 },
        //     innerY: { label: 'inner scale Y', value: defLevaControls.innerY, min: -100, max: 100, step: 1 },
        //     // lenOuter: { x: 0, y: 0 },
        //     // lenInner: { x: 0, y: 0 },
        //     //scene: Scene;       // Scene params
        //     stroke: { value: defLevaControls.stroke, min: 1, max: 100, step: 1 },
        // }),
        () => {
            console.log('invoked');
            
            return {
                nOuter: { label: '# outer points', value: defLevaControls.nOuter, min: 1, max: 100, step: 1 },
                nInner: { label: '# inner points', value: defLevaControls.nInner, min: 1, max: 100, step: 1 },
                outerX: { label: 'outer scale X', value: defLevaControls.outerX, min: -100, max: 100, step: 1 },
                outerY: { label: 'outer scale Y', value: defLevaControls.outerY, min: -100, max: 100, step: 1 },
                innerX: { label: 'inner scale X', value: defLevaControls.innerX, min: -100, max: 100, step: 1 },
                innerY: { label: 'inner scale Y', value: defLevaControls.innerY, min: -100, max: 100, step: 1 },
                // lenOuter: { x: 0, y: 0 },
                // lenInner: { x: 0, y: 0 },
                //scene: Scene;       // Scene params
                stroke: { value: defLevaControls.stroke, min: 1, max: 100, step: 1 },
            }
        },
        { store }
    );
    /**/

    /*2*/
    const [param, setParam] = useAtom(paramAtom);
    const controls = useControls(
        {
            nOuter: { label: '# outer points', value: defLevaControls.nOuter, min: 1, max: 100, step: 1 },
            nInner: { label: '# inner points', value: defLevaControls.nInner, min: 1, max: 100, step: 1 },
            outerX: { label: 'outer scale X', value: defLevaControls.outerX, min: -100, max: 100, step: 1 },
            outerY: { label: 'outer scale Y', value: defLevaControls.outerY, min: -100, max: 100, step: 1 },
            innerX: { label: 'inner scale X', value: defLevaControls.innerX, min: -100, max: 100, step: 1 },
            innerY: { label: 'inner scale Y', value: defLevaControls.innerY, min: -100, max: 100, step: 1 },
            // lenOuter: { x: 0, y: 0 },
            // lenInner: { x: 0, y: 0 },
            //scene: Scene;       // Scene params
            // stroke: { value: defLevaControls.stroke, min: 1, max: 100, step: 1 },
            stroke: (() => {
                console.log('invoked', param);
                // return { value: defLevaControls.stroke, min: 1, max: 100, step: 1 };
                return { value: param, min: 1, max: 100, step: 1 };
            })(),
        },
        { store }
    );
    /**/

    const setLevaControls = useUpdateAtom(levaControlsAtom);

    useEffect(() => {
        console.log('values', controls);

        const newLevaControls: LevaControlsType = {
            nOuter: controls.nOuter,
            nInner: controls.nInner,
            outerX: controls.outerX,
            outerY: controls.outerY,
            innerX: controls.innerX,
            innerY: controls.innerY,
            stroke: controls.stroke,
        };
        setLevaControls(newLevaControls);

    }, Object.values(controls));

    return (<>
        {/* <button onClick={() => setParam((v) => v + 1)}>qqq {param}</button> */}

        <div
            className="leva-override"
            style={{
                display: 'grid',
                width: 300,
                gap: 10,
                //paddingBottom: 40,
                overflow: 'auto',
                background: '#181C20',
            }}
        >
            {/* <LevaPanel fill flat titleBar={false} store={shapeStore} /> */}
            <LevaPanel fill flat titleBar={false} store={store} />
        </div>

    </>);
}
