import React, { HTMLAttributes, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultSpapes, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { PreviewBox } from './PreviewBox';
import { animated, config, useSprings } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { clamp } from '@/utils/clamp';
import { move } from '@/utils/move';
import styles from './Section2_Presets.module.scss';

function fn(order: number[], active = false, originalIndex = 0, curIndex = 0, y = 0) {
    return (index: number) =>
        active && index === originalIndex
            ? {
                y: curIndex * 100 + y,
                scale: 1.1,
                zIndex: 1,
                shadow: 15,
                immediate: (key: string) => key === 'zIndex',
                config: (key: string) => (key === 'y' ? config.stiff : config.default),
            }
            : {
                y: order.indexOf(index) * 100,
                scale: 1,
                zIndex: 0,
                shadow: 1,
                immediate: false,
            };
}


function DraggableList({ items }: { items: string[]; }) {

    const order = useRef(items.map((_, idx) => idx)); // Store indicies as a local ref, this represents the item order

    const [springs, api] = useSprings(items.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.

    const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {

        const curIndex = order.current.indexOf(originalIndex);
        const curRow = clamp(Math.round((curIndex * 100 + y) / 100), 0, items.length - 1);
        const newOrder = move(order.current, curIndex, curRow);

        api.start(fn(newOrder, active, originalIndex, curIndex, y)); // Feed springs new style data, they'll animate the view without causing a single render

        if (!active) {
            order.current = newOrder;
        }
    });

    return (
        <div className={styles.content} style={{ height: items.length * 100 }}>
            {springs.map(({ y, scale, zIndex, shadow, }, i) => (
                <animated.div
                    children={items[i]}
                    style={{ y, scale, zIndex, boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`), }}
                    {...bind(i)}
                    key={i}
                />
            ))}
        </div>
    );
}

function PresetView({ shapeParams, shape, ...rest }: { shapeParams: NewShapeParams, shape: GeneratorResult; } & HTMLAttributes<SVGSVGElement>) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <PreviewBox shapeParams={shapeParams} shape={shape} onClick={() => setShapeParams(shapeParams)} {...rest} />
    );
}

function ShapePresets() {
    const shapes = useAtomValue(vaultSpapes.validAtom);
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <div className="py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1">
                    {shapes.map(({ shapeParams, shape }, idx) => (
                        <PresetView shapeParams={shapeParams} shape={shape} key={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function Section2_Presets() {
    return (
        <UISection openAtom={openSections.presetsAtom} title={"Presets"}>
            <ShapePresets />
            <div className="relative">
                <DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />
            </div>
        </UISection>
    );
}
