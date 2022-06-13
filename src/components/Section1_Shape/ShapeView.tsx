import React, { HTMLAttributes } from "react";
import { useAtom, useAtomValue } from "jotai";
import { editorShapeAtom, editorShapeParamsAtom, viewboxOptionAtoms } from "@/store/store";
import { NewShapeParams } from "@/store/ngon/shape";
import { GeneratorResult, pointsToLines, separatePoints } from "@/store/ngon/generator";
import { useDrag } from "@use-gesture/react";
import { classNames } from "@/utils/classnames";
import { rnd2 } from "@/utils/numbers";

const enum PointType {
    none,
    inner,
    outer,
    //start,
}

function Points(points: [number, number][], pointType: PointType, showDots: boolean) {
    const isOuter = pointType === PointType.outer;
    return points.map(([x, y], idx) => (
        <circle
            className={classNames(
                "touch-none hover:cursor-tm-move",
                isOuter ? "outer-pt" : "inner-pt",
                !showDots ? "" : isOuter ? "stroke-orange-500 fill-orange-500/40" : "stroke-blue-500 fill-blue-500/40",
            )}
            cx={x} cy={y} r={'.3'}
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

            {/* Inner */}
            {showAll && showInnerLines && <path className="stroke-blue-500" strokeDasharray={'.2'} d={inner.join('')} />}

            {Points(innerPts, PointType.inner, showAll && showInnerDots)}

            {/* {showInnerDots && <circle className="stroke-primary-500 fill-green-500" cx={shape.start.cx} cy={shape.start.cy} r=".3" />} */}
        </g>
    );
}

export function ShapeView(props: HTMLAttributes<SVGSVGElement>) {
    const [shapeParams, setShapeParams] = useAtom(editorShapeParamsAtom);
    const shape = useAtomValue(editorShapeAtom);

    const { outerX, outerY, innerX, innerY, } = shapeParams;
    const bind = useDrag(({ first, last, target, movement: [mx, my], memo = { outerX, outerY, innerX, innerY, pointType: PointType.none } }) => {
        const circle = target as Element;
        if (first) {
            const classList = circle.classList;
            memo.pointType = classList.contains('inner-pt') ? PointType.inner : classList.contains('outer-pt') ? PointType.outer : PointType.none;
        }
        if (memo.pointType !== PointType.none) {
            if (first) {
                memo.keyX = memo.pointType === PointType.outer ? "outerX" : "innerX";
                memo.keyY = memo.pointType === PointType.outer ? "outerY" : "innerY";
                circle.classList.add('tm-point-down');
                circle.setAttribute('r', '.5');
            }
            if (last) {
                circle.classList.remove('tm-point-down');
                circle.setAttribute('r', '.3');
            }
            (mx || my) && setShapeParams((p) => ({ ...p, [memo.keyX]: rnd2(memo[memo.keyX] + mx), [memo.keyY]: rnd2(memo[memo.keyY] + my) }));
        }
        return memo;
    });

    const { x: cx, y: cy } = shape.center;
    const shades = [];

    for (let i = 0; i < shape.points.length - 1; i = i + 2) {
        const a = shape.points[i];
        const b = shape.points[i + 1];
        shades.push(`M${cx} ${cy}L${a[0]} ${a[1]}L${b[0]} ${b[1]}z`);
    }

    //console.log('shades', shades);

    return (
        <svg
            className="w-full h-full fill-transparent touch-none"
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            preserveAspectRatio="none"
            {...bind()}
            {...props}
        >
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />

            <path className="stroke-transparent fill-primary-300/30" style={{ strokeWidth: shapeParams.stroke }} d={shades.join('')} />

            <ShapeViewGadgets shapeParams={shapeParams} shape={shape} />
        </svg>
    );
}

//TODO: single click handler - done
//TODO: triangles shading
//TODO: curves vs. lines
//TODO: divide inner lines to sub-lines
//TODO: preview svg instead of text preview
//TODO: implement hint tooltip
//TODO: box size goes to the viewbox as overlay
//TODO: ctrl+enter to round value as ctrl+click
//TODO: validate and clamp local storage stored params
