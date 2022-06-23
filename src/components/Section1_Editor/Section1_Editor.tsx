import { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { editorShapeAtom, editorShapeParamsAtom } from '@/store/store';
import { generateSvg, } from '@/store/ngon/generator';
import { a, easings, useSpring } from '@react-spring/web';
import { EditorShape } from './EditorShape';
import { EditorControls } from './EditorControls';

export const previewBoxShadow = { boxShadow: '0 1px 1px -1px #00000018, 0 1px 1px 0 #00000024, 0 1px 3px 0 #0000001f', };

function ShapeViewContainer() {
    const styles = useSpring({ scale: 1, from: { scale: .2 }, config: { duration: 2000, easing: easings.easeInOutElastic } });
    return (
        <div className="bg-slate-100 aspect-square border-primary-300 border overflow-hidden" style={{ ...previewBoxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="w-full h-full object-cover">
                <EditorShape />
            </a.div>
        </div>
    );
}

export function Section1_Editor() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr),auto] gap-4">
            <ShapeViewContainer />
            <EditorControls className="border-primary-300 border" style={previewBoxShadow} />
        </div>
    );
}
