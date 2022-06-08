import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { editorShapeParamsAtom, viewboxOptionAtoms } from '@/store/store';
import { a, easings, useSpring } from '@react-spring/web';
import { classNames } from '@/utils/classnames';
import { generate, GeneratorResult } from '@/store/ngon/generator';
import { ShapeControls } from './ShapeControls';

const pointsToLines = (pts: [number, number][], centerX: number, centerY: number) => pts.map(([x, y]) => `M${centerX},${centerY}L${x},${y}`);

function PreviewSvg(props: HTMLAttributes<SVGSVGElement>) {
    const shapeParams = useAtomValue(editorShapeParamsAtom);

    const shape = generate(shapeParams);
    const outerPts = shape.points.filter((_, idx) => idx % shapeParams.innerN !== 0);
    const innerPts = shape.points.filter((_, idx) => idx % shapeParams.innerN === 0);

    const outer = pointsToLines(outerPts, shape.center.x, shape.center.y);
    const inner = pointsToLines(innerPts, shape.center.x, shape.center.y);

    const showOuterLines = useAtomValue(viewboxOptionAtoms.showOuterLinesAtom);
    const showInnerLines = useAtomValue(viewboxOptionAtoms.showInnerLinesAtom);

    return (
        <svg viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`} className="w-full h-full" {...props} preserveAspectRatio="none">
            <path
                style={{ fill: 'none', stroke: 'purple', strokeWidth: shapeParams.stroke }}
                d={shape.d}
            />

            {showOuterLines && (<>
                <path className="fill-purple-500 stroke-blue-500 stroke-[0.1]" d={outer.join('')} />

                {outerPts.map(([x, y], idx) => (
                    <circle className="fill-transparent stroke-green-500 stroke-[0.1]" cx={x} cy={y} r=".3" key={idx}/>
                ))}
            </>)}

            {showInnerLines && (<>
                <path className="fill-current text-red-500 stroke-current stroke-[0.1] helper-inn-lines" d={inner.join('')} />

                {innerPts.map(([x, y], idx) => (
                    <circle className="fill-purple-500 stroke-purple-500 stroke-[0.1]" cx={x} cy={y} r=".3" key={idx}/>
                ))}
            </>)}

            {showOuterLines && (
                <circle className="origin fill-transparent stroke-red-500 stroke-[0.1]" cx={shape.start.cx} cy={shape.start.cy} r=".3" />
            )}
        </svg >
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
