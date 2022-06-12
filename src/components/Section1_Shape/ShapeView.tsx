import React, { HTMLAttributes, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { editorShapeAtom, editorShapeParamsAtom, viewboxOptionAtoms } from "@/store/store";
import { generate, GeneratorResult, pointsToLines, separatePoints } from "@/store/ngon/generator";
import { useDrag } from "@use-gesture/react";
import { NewShapeParams } from "@/store/ngon/shape";
import { classNames } from "@/utils/classnames";
import { rnd2 } from "@/utils/numbers";

const enum PointType {
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

export function ViewHelpers({ shapeParams, shape }: { shapeParams: NewShapeParams; shape: GeneratorResult; }) {
    const { outerPts, innerPts } = separatePoints(shape.points, shapeParams.innerN, shapeParams.swap);

    const outer = pointsToLines(outerPts, shapeParams.ofsX, shapeParams.ofsY);
    const inner = pointsToLines(innerPts, shapeParams.ofsX, shapeParams.ofsY);

    const showOuterLines = useAtomValue(viewboxOptionAtoms.showOuterLinesAtom);
    const showInnerLines = useAtomValue(viewboxOptionAtoms.showInnerLinesAtom);
    const showOuterDots = useAtomValue(viewboxOptionAtoms.showOuterDotsAtom);
    const showInnerDots = useAtomValue(viewboxOptionAtoms.showInnerDotsAtom);
    return (
        <g className="stroke-[0.05]">
            {/* Outer */}
            {showOuterLines && <path className="stroke-orange-500" strokeDasharray={'.2'} d={outer.join('')} />}

            {showOuterDots && <circle className="stroke-primary-700" cx={shape.start.cx} cy={shape.start.cy} r=".5" />}

            {outerPts.map(([x, y], idx) => <Point x={x} y={y} pointType={PointType.outer} key={`o${idx}`} showDots={showOuterDots} />)}

            {/* Inner */}
            {showInnerLines && <path className="stroke-blue-500" strokeDasharray={'.2'} d={inner.join('')} />}

            {innerPts.map(([x, y], idx) => <Point x={x} y={y} pointType={PointType.inner} key={`i${idx}`} showDots={showInnerDots} />)}

            {/* {showInnerDots && <circle className="stroke-primary-500 fill-green-500" cx={shape.start.cx} cy={shape.start.cy} r=".3" />} */}
        </g>
    );
}

export function ShapeView(props: HTMLAttributes<SVGSVGElement>) {
    const shapeParams = useAtomValue(editorShapeParamsAtom);
    const shape = useAtomValue(editorShapeAtom);
    return (
        <svg viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`} className="w-full h-full fill-transparent" {...props} preserveAspectRatio="none">
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
            <ViewHelpers shapeParams={shapeParams} shape={shape} />
        </svg>
    );
}
