import { useRef } from 'react';
import { Atom, useAtomValue } from 'jotai';
import { a, easings, useSpring } from '@react-spring/web';
import { Scene } from '@/store/api/shape-types';

const boxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

function Preview({ scene, d }: { scene: Scene; d: string; }) {
    return (
        <svg viewBox={`0 0 ${scene.w} ${scene.h}`}>
            <path d={d} />
        </svg >
    );
}

function PreviewContainer() {
    const styles = useSpring({ scale: 1, from: { scale: 2 }, config: { duration: 3000, easing: easings.easeInOutElastic } });
    const scene: Scene = {
        w: 14,
        h: 14,
        scale: 100,
        ofsX: 7,
        ofsY: 7,
    };
    return (
        <div className="bg-slate-400 overflow-hidden" style={{ ...boxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="h-full object-cover border border-slate-300 border-b-slate-400">
                <Preview scene={scene} d={'M7,6.4L7.18,1.14L12.23,6.4L7.29,8.41L10.23,6.4L7,12.9L3.77,6.4L6.71,8.41L1.77,6.4L6.82,1.14z'} />
            </a.div>
        </div>
    );
}

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

function Controls() {
    return (
        <div className="">Controls</div>
    );
}

export function Section0_Preview() {
    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
            <PreviewContainer />
            <Controls />
        </div>
    );
}
