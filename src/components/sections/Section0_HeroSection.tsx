import { HTMLAttributes, useRef } from 'react';
import { Atom, useAtom, useAtomValue } from 'jotai';
import { a, easings, useSpring } from '@react-spring/web';
import { Scene } from '@/store/api/shape-types';
import { folder, Leva, LevaPanel, useControls, useCreateStore } from 'leva';
import { editorShapeAtom, shapePathAtom } from '@/store/store';
import { ControlsStore } from './Editor/ControlsStore';
import { ControlsLeva } from './Editor/ControlsLeva';
import { GeneratorResult } from '@/store/api/shape-generator-ngon';
import { classNames } from '@/utils/classnames';

const boxShadow = { boxShadow: '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)', };

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
        <div className="bg-slate-300 aspect-square overflow-hidden" style={{ ...boxShadow, transition: "all .2s" }}>
            <a.div style={styles} className="w-full h-full object-cover">
                <Preview scene={scene} d={shapePath.d} />
                {/* <Preview scene={scene} d={'M7,6.4L7.18,1.14L12.23,6.4L7.29,8.41L10.23,6.4L7,12.9L3.77,6.4L6.71,8.41L1.77,6.4L6.82,1.14z'} /> */}
            </a.div>
        </div>
    );
}

const iconShadow = { filter: 'drop-shadow(1px 1px 1px #0002)', };

function Controls() {
    const [editorShape, setEditorShape] = useAtom(editorShapeAtom);

    const shapeStore = useCreateStore();

    // const data = useControls(
    //     {
    //         //color: { value: '#f00', onChange: (v) => {}, transient: false },
    //         // ...editorShape,
    //         myNumber: {
    //             value: 4,
    //             min: 0,
    //             max: 10,
    //             step: 1,
    //         },
    //         myFolder: folder(
    //             {
    //                 x: '#ff005b',
    //                 y: true,
    //                 z: 'hello',
    //             },
    //             { collapsed: false }
    //         ),
    //     },
    //     // { store: shapeStore },
    // );

    const colorsStore = useCreateStore();

    const colors = useControls(
        {
            colors: folder({
                elevation1: '#292D39',
                elevation2: '#181C20',
                elevation3: '#373C4B',
                accent1: '#0066DC',
                accent2: '#007BFF',
                accent3: '#3C93FF',
                highlight1: '#535760',
                highlight2: '#8C92A4',
                highlight3: '#FEFEFE',
                vivid1: '#ffcc00',
            }),
        },
        { store: colorsStore },
    );

    return (<>
        <div
            className="leva-override"
            style={{
                display: 'grid',
                width: 300,
                gap: 10,
                paddingBottom: 40,
                overflow: 'auto',
                background: '#181C20',
            }}
        >
            {/* <LevaPanel fill flat titleBar={false} store={shapeStore} /> */}
            <LevaPanel fill flat titleBar={false} store={colorsStore} />
        </div>
    </>);
}

export function Section0_Preview() {
    return (
        <div className="grid grid-cols-[minmax(0,1fr),auto] gap-4">
            {/* <Leva
                isRoot={true}
            //detached={false}
            // detached         // default = true,  false would make the pane fill the parent dom node it's rendered in.
            // oneLineLabels    // default = false, alternative layout for labels, with labels and fields on separate rows
            // hideTitleBar // default = false, hides the GUI header
            // collapsed        // default = false, when true the GUI is collpased
            // hidden           // default = false, when true the GUI is hidden
            /> */}
            <PreviewContainer />

            {/* <Controls /> */}
            <ControlsStore>
                <ControlsLeva />
            </ControlsStore>
        </div>
    );
}
