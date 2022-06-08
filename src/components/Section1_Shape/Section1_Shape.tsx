import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { editorShapeParamsAtom, viewboxOptionAtoms } from '@/store/store';
import { generate, pointsToLines, separatePoints } from '@/store/ngon/generator';
import { a, easings, useSpring } from '@react-spring/web';
import { classNames } from '@/utils/classnames';
import { ShapeControls } from './ShapeControls';

function PreviewSvg(props: HTMLAttributes<SVGSVGElement>) {
    const shapeParams = useAtomValue(editorShapeParamsAtom);

    const shape = generate(shapeParams);
    const {outerPts, innerPts} = separatePoints(shape.points, shapeParams.innerN);

    const outer = pointsToLines(outerPts, shape.center.x, shape.center.y);
    const inner = pointsToLines(innerPts, shape.center.x, shape.center.y);

    const showOuterLines = useAtomValue(viewboxOptionAtoms.showOuterLinesAtom);
    const showInnerLines = useAtomValue(viewboxOptionAtoms.showInnerLinesAtom);
    const showOuterDots = useAtomValue(viewboxOptionAtoms.showOuterDotsAtom);
    const showInnerDots = useAtomValue(viewboxOptionAtoms.showInnerDotsAtom);

    return (
        <svg viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`} className="w-full h-full fill-transparent" {...props} preserveAspectRatio="none">
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />

            <g className="stroke-[0.05]">
                {/* Outer */}
                {showOuterLines && (<>
                    <path className="stroke-orange-500" strokeDasharray={'.2'} d={outer.join('')} />
                </>)}

                {showOuterDots && (<>
                    {outerPts.map(([x, y], idx) => <circle className="stroke-orange-500 fill-orange-500/40" cx={x} cy={y} r=".3" key={idx} />)}

                    <circle className="stroke-primary-700" cx={shape.start.cx} cy={shape.start.cy} r=".5" />
                </>)}

                {/* Inner */}
                {showInnerLines && (<>
                    <path className="stroke-blue-500" strokeDasharray={'.2'} d={inner.join('')} />
                </>)}

                {showInnerDots && (<>
                    {innerPts.map(([x, y], idx) => <circle className="stroke-blue-500 fill-blue-500/40" cx={x} cy={y} r=".3" key={idx} />)}
                </>)}

                {/* {showInnerDots && (
                    <circle className="stroke-primary-500 fill-green-500" cx={shape.start.cx} cy={shape.start.cy} r=".3" />
                )} */}
            </g>
        </svg>
    );
}

const previewBoxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

function PreviewContainer() {
    const styles = useSpring({ scale: 1, from: { scale: .2 }, config: { duration: 2000, easing: easings.easeInOutElastic } });
    return (
        <div className="bg-slate-100 aspect-square border-primary-300 border overflow-hidden" style={{ ...previewBoxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="w-full h-full object-cover">
                <PreviewSvg />
            </a.div>
        </div>
    );
}

export function Section1_Shape() {
    return (
        <div className="grid grid-cols-[minmax(0,1fr),auto] gap-4">
            <PreviewContainer />
            <ShapeControls className="border-primary-300 border " style={previewBoxShadow} />
        </div>
    );
}
