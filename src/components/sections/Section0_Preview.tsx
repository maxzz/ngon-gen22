import { HTMLAttributes } from 'react';
import { Atom, useAtom, useAtomValue } from 'jotai';
import { a, easings, useSpring } from '@react-spring/web';
import { classNames } from '@/utils/classnames';
import { Scene } from '@/store/api/shape-types';
import { shapePathAtom } from '@/store/store';
import { GeneratorResult } from '@/store/api/shape-generator-ngon';
import { ShapeControls } from './Editor/ShapeControls';

const previewBoxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

function Preview({ scene, d, ...rest }: { scene: Scene; d: string; } & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg viewBox={`0 0 ${scene.w} ${scene.h}`} {...rest}>
            <path style={{ fill: 'none', stroke: 'purple', strokeWidth: .1 }} d={d} />
        </svg >
    );
}

function PreviewContainer() {
    const styles = useSpring({ scale: 1, from: { scale: .2 }, config: { duration: 2000, easing: easings.easeInOutElastic } });

    const scene: Scene = {
        // w: 14,
        // h: 14,
        w: 24,
        h: 24,
        scale: 100,
        ofsX: 7,
        ofsY: 7,
    };

    const shapePath: GeneratorResult = useAtomValue(shapePathAtom);

    return (
        <div className="bg-slate-100 aspect-square border-primary-300 border overflow-hidden" style={{ ...previewBoxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="w-full h-full object-cover">
                <Preview scene={scene} d={shapePath.d} />
                {/* <Preview scene={scene} d={'M7,6.4L7.18,1.14L12.23,6.4L7.29,8.41L10.23,6.4L7,12.9L3.77,6.4L6.71,8.41L1.77,6.4L6.82,1.14z'} /> */}
            </a.div>
        </div>
    );
}

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

export function Section0_Preview() {
    return (
        <div className="grid grid-cols-[minmax(0,1fr),auto] gap-4">
            <PreviewContainer />
            <ShapeControls className="border-primary-300 border " style={previewBoxShadow} />
        </div>
    );
}
