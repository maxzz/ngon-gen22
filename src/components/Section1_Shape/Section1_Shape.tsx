import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { editorShapeAtom, editorShapeParamsAtom } from '@/store/store';
import { generateSvg, } from '@/store/ngon/generator';
import { a, easings, useSpring } from '@react-spring/web';
import { EditorShapeView } from './EditorShapeView';
import { EditorShapeControls } from './EditorShapeControls';
import { classNames } from '@/utils/classnames';

const previewBoxShadow = { boxShadow: '0 1px 1px -1px #00000018, 0 1px 1px 0 #00000024, 0 1px 3px 0 #0000001f', };

function ShapeViewContainer() {
    const styles = useSpring({ scale: 1, from: { scale: .2 }, config: { duration: 2000, easing: easings.easeInOutElastic } });
    return (
        <div className="bg-slate-100 aspect-square border-primary-300 border overflow-hidden" style={{ ...previewBoxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="w-full h-full object-cover">
                <EditorShapeView />
            </a.div>
        </div>
    );
}

function SaveButton({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={classNames(
                "px-1 py-0.5 border-primary-400 border-dotted border rounded-sm shadow-sm",
                "bg-primary-200 hover:bg-primary-300 focus:bg-primary-300",
                "outline-none focus:ring-1 ring-offset-1 ring-offset-primary-50 ring-primary-700/50",
                "active:scale-[.97] cursor-pointer",
                className
            )}
            type="button"
            value="Copy" {...rest}
        />
    );
}

function ShapeViewText() {
    const shapeParams = useAtomValue(editorShapeParamsAtom);
    const shape = useAtomValue(editorShapeAtom);
    const generated = generateSvg(shape.d, shapeParams.w, shapeParams.h, shapeParams.stroke);
    return (
        <div className="px-2 py-1 h-32 text-xs bg-primary-100 border-primary-300 border overflow-hidden" style={{ ...previewBoxShadow }}>

            <SaveButton onClick={async () => {
                navigator.clipboard.writeText(generated);
            }} />

            <div className="h-full overflow-overlay">
                <textarea className="w-full bg-inherit outline-none" rows={5} readOnly spellCheck="false" value={generated}>
                </textarea>
            </div>
        </div>
    );
}

export function Section1_Shape() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr),auto] gap-4">
            <ShapeViewContainer />
            <EditorShapeControls className="border-primary-300 border" style={previewBoxShadow} />
            <div className="col-span-full">
                <ShapeViewText />
            </div>
        </div>
    );
}
