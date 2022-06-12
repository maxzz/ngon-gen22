import React, { HTMLAttributes, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { editorShapeAtom, editorShapeParamsAtom, viewboxOptionAtoms } from "@/store/store";
import { generate, GeneratorResult, pointsToLines, separatePoints } from "@/store/ngon/generator";
import { useDrag } from "@use-gesture/react";
import { NewShapeParams } from "@/store/ngon/shape";
import { classNames } from "@/utils/classnames";
import { rnd2 } from "@/utils/numbers";

const enum PointType {
    none,
    inner,
    outer,
    //start,
}

function Point({ x, y, pointType, showDots }: { x: number; y: number; pointType: PointType; showDots: boolean; }) {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);

    const isOuter = pointType === PointType.outer;
    const keyX: keyof NewShapeParams = isOuter ? "outerX" : "innerX";
    const keyY: keyof NewShapeParams = isOuter ? "outerY" : "innerY";

    const [isDown, setIsDown] = useState(false);
    const bind = useDrag(({ down, movement: [mx, my], memo = { x: shapeParams[keyX], y: shapeParams[keyY] } }) => {
        setIsDown(down);
        (mx || my) && setShapeParams((p) => ({ ...p, [keyX]: rnd2(memo.x + mx), [keyY]: rnd2(memo.y + my) }));
        return memo;
    });

    return (
        <circle
            className={classNames(
                "touch-none hover:cursor-tm-move",
                !showDots ? "" : isOuter ? "stroke-orange-500 fill-orange-500/40" : "stroke-blue-500 fill-blue-500/40",
                isDown && "stroke-green-500 stroke-[.1]",
            )}
            cx={x} cy={y} r={isDown ? '.5' : '.3'} {...bind()}
        />
    );
}

function Points(points: [number, number][], pointType: PointType, showDots: boolean) {
    const isOuter = pointType === PointType.outer;
    const isDown = false;

    return points.map(([x, y], idx) => (
        <circle
            className={classNames(
                "touch-none hover:cursor-tm-move",
                isOuter ? "outer-pt" : "inner-pt",
                !showDots ? "" : isOuter ? "stroke-orange-500 fill-orange-500/40" : "stroke-blue-500 fill-blue-500/40",
                isDown && "stroke-green-500 stroke-[.1]",
            )}
            cx={x} cy={y} r={isDown ? '.5' : '.3'}
            key={`${pointType}_${idx}`}
        />
    ));
}

export function ShapeViewGadgets({ shapeParams, shape }: { shapeParams: NewShapeParams; shape: GeneratorResult; }) {
    const { outerPts, innerPts } = separatePoints(shape.points, shapeParams.innerN, shapeParams.swap);

    const outer = pointsToLines(outerPts, shapeParams.ofsX, shapeParams.ofsY);
    const inner = pointsToLines(innerPts, shapeParams.ofsX, shapeParams.ofsY);

    const showAll = useAtomValue(viewboxOptionAtoms.showAllAtom);
    const showOuterLines = useAtomValue(viewboxOptionAtoms.showOuterLinesAtom);
    const showInnerLines = useAtomValue(viewboxOptionAtoms.showInnerLinesAtom);
    const showOuterDots = useAtomValue(viewboxOptionAtoms.showOuterDotsAtom);
    const showInnerDots = useAtomValue(viewboxOptionAtoms.showInnerDotsAtom);
    
    return (
        <g className="stroke-[0.05]">
            {/* Outer */}
            {showAll && showOuterLines && <path className="stroke-orange-500" strokeDasharray={'.2'} d={outer.join('')} />}

            {showAll && showOuterDots && <circle className="stroke-primary-700" cx={shape.start.cx} cy={shape.start.cy} r=".5" />}

            {Points(outerPts, PointType.outer, showAll && showOuterDots)}
            {/* {outerPts.map(([x, y], idx) => (<>
                <Point x={x} y={y} pointType={PointType.outer} key={`o${idx}`} showDots={showAll && showOuterDots} />
            </>))} */}

            {/* Inner */}
            {showAll && showInnerLines && <path className="stroke-blue-500" strokeDasharray={'.2'} d={inner.join('')} />}

            {Points(innerPts, PointType.inner, showAll && showInnerDots)}
            {/* {innerPts.map(([x, y], idx) => (
                <Point x={x} y={y} pointType={PointType.inner} key={`i${idx}`} showDots={showAll && showInnerDots} />
            ))} */}

            {/* {showInnerDots && <circle className="stroke-primary-500 fill-green-500" cx={shape.start.cx} cy={shape.start.cy} r=".3" />} */}
        </g>
    );
}

export function ShapeView(props: HTMLAttributes<SVGSVGElement>) {
    //const shapeParams = useAtomValue(editorShapeParamsAtom);
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    const shape = useAtomValue(editorShapeAtom);
    
    const [isDown, setIsDown] = useState(false);
    const { outerX, outerY, innerX, innerY, } = shapeParams;
    
    const bind = useDrag(({first, last, down, event, target, movement: [mx, my], memo = { outerX, outerY, innerX, innerY, } }) => {
        setIsDown(down);
        const className = (target as Element).classList;
        const pointType = className.contains('inner-pt') ? PointType.inner : className.contains('outer-pt') ? PointType.outer : PointType.none;

        //console.log('eve', pointType, target);

        if (first) {
            (target as Element).classList.add('tm-point-down');
            (target as Element).setAttribute('r', '.5');
        }

        if (last) {
            (target as Element).classList.remove('tm-point-down');
            (target as Element).setAttribute('r', '.3');
        }

        if (pointType === PointType.outer || pointType === PointType.inner) {
            const keyX: keyof NewShapeParams = pointType === PointType.outer ? "outerX" : "innerX";
            const keyY: keyof NewShapeParams = pointType === PointType.outer ? "outerY" : "innerY";

            (mx || my) && setShapeParams((p) => ({ ...p, [keyX]: rnd2(memo[keyX] + mx), [keyY]: rnd2(memo[keyY] + my) }));
    
            //console.log('eve', target);
        }
        return memo;
    });

    return (
        <svg
            className="w-full h-full fill-transparent touch-none"
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            preserveAspectRatio="none"
            {...bind()}
            {...props}
        >
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
            
            <ShapeViewGadgets shapeParams={shapeParams} shape={shape} />
        </svg>
    );
}

/** /
export function ShapeView(props: HTMLAttributes<SVGSVGElement>) {
    const shapeParams = useAtomValue(editorShapeParamsAtom);
    const shape = useAtomValue(editorShapeAtom);
    
    return (
        <svg
            className="w-full h-full fill-transparent"
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            preserveAspectRatio="none"

            onClick={(e) => {
                console.log('eve', e)
            }}

            {...props}
        >
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
            
            <ShapeViewGadgets shapeParams={shapeParams} shape={shape} />
        </svg>
    );
}
/**/

//TODO: single click handler
//TODO: triangles shading
//TODO: curves vs. lines
//TODO: divide inner lines to sub-lines
//TODO: preview svg instead of text preview
//TODO: implement hint tooltip
//TODO: box size goes to the viewbox as overlay
//TODO: validate and clamp local storage stored params
