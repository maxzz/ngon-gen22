import React, { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { editorShapeParamsAtom, viewboxOptionAtoms } from "@/store/store";
import { generate, pointsToLines, separatePoints } from "@/store/ngon/generator";

const enum PointTyp {
    inner,
    outer,
    start,
}

function PointOuter({ x, y }: { x: number; y: number; }) {
    return (
        <circle className="stroke-orange-500 fill-orange-500/40" cx={x} cy={y} r=".3" />
    );
}

function PointInner({ x, y }: { x: number; y: number; }) {
    return (
        <circle className="stroke-blue-500 fill-blue-500/40" cx={x} cy={y} r=".3" />
    );
}

export function ShapeView(props: HTMLAttributes<SVGSVGElement>) {
    const shapeParams = useAtomValue(editorShapeParamsAtom);

    const shape = generate(shapeParams);
    const { outerPts, innerPts } = separatePoints(shape.points, shapeParams.innerN, shapeParams.swap);

    const outer = pointsToLines(outerPts, shapeParams.ofsX, shapeParams.ofsY);
    const inner = pointsToLines(innerPts, shapeParams.ofsX, shapeParams.ofsY);

    const showOuterLines = useAtomValue(viewboxOptionAtoms.showOuterLinesAtom);
    const showInnerLines = useAtomValue(viewboxOptionAtoms.showInnerLinesAtom);
    const showOuterDots = useAtomValue(viewboxOptionAtoms.showOuterDotsAtom);
    const showInnerDots = useAtomValue(viewboxOptionAtoms.showInnerDotsAtom);

    return (
        <svg viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`} className="w-full h-full fill-transparent" {...props} preserveAspectRatio="none">
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />

            <g className="stroke-[0.05]">
                {/* Outer */}
                {showOuterLines && <path className="stroke-orange-500" strokeDasharray={'.2'} d={outer.join('')} />}

                {showOuterDots && outerPts.map(([x, y], idx) => <PointOuter x={x} y={y} key={idx} />)}

                {showOuterDots && <circle className="stroke-primary-700" cx={shape.start.cx} cy={shape.start.cy} r=".5" />}

                {/* Inner */}
                {showInnerLines && <path className="stroke-blue-500" strokeDasharray={'.2'} d={inner.join('')} />}

                {showInnerDots && innerPts.map(([x, y], idx) => <PointInner x={x} y={y} key={idx} />)}

                {/* {showInnerDots && <circle className="stroke-primary-500 fill-green-500" cx={shape.start.cx} cy={shape.start.cy} r=".3" />} */}
            </g>
        </svg>
    );
}
