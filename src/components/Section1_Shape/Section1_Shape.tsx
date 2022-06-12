import { a, easings, useSpring } from '@react-spring/web';
import { ShapeView } from './ShapeView';
import { ShapeControls } from './ShapeControls';
import { useAtomValue } from 'jotai';
import { editorShapeAtom, editorShapeParamsAtom } from '@/store/store';
import { generateSvg, pointsToLines } from '@/store/ngon/generator';

const previewBoxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

function ShapeViewContainer() {
    const styles = useSpring({ scale: 1, from: { scale: .2 }, config: { duration: 2000, easing: easings.easeInOutElastic } });
    return (
        <div className="bg-slate-100 aspect-square border-primary-300 border overflow-hidden" style={{ ...previewBoxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="w-full h-full object-cover">
                <ShapeView />
            </a.div>
        </div>
    );
}

function ShapeViewText() {
    const shapeParams = useAtomValue(editorShapeParamsAtom);
    const shape = useAtomValue(editorShapeAtom);
    const path = pointsToLines(shape.points, shape.center.x, shape.center.y);
    const generated = generateSvg(path.join(''), shapeParams.w, shapeParams.h, shapeParams.stroke);
    return (
        <div className="px-2 py-1 h-32 text-xs bg-primary-100 border-primary-300 border overflow-hidden" style={{ ...previewBoxShadow }}>
            <div className="h-full overflow-overlay">
                <div className="pr-4">
                    {generated}
                </div>
            </div>
        </div>
    );
}

export function Section1_Shape() {
    return (
        <div className="grid grid-cols-[minmax(0,1fr),auto] gap-4">
            <ShapeViewContainer />
            <ShapeControls className="border-primary-300 border" style={previewBoxShadow} />
            <div className="col-span-full">
                <ShapeViewText />
            </div>
        </div>
    );
}
