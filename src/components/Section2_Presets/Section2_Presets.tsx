import React, { HTMLAttributes } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { editorShapeParamsAtom, openSections, vaultData, } from '@/store/store';
import { NewShapeParams } from '@/store/ngon/shape';
import { IO } from '@/store/ngon/shape-io';
import { GeneratorResult } from '@/store/ngon/generator';
import { UISection } from '../UI/UISection';
import { classNames } from '@/utils/classnames';

export function ShapeView({ shapeParams, shape, className, ...rest }: { shapeParams: NewShapeParams, shape: GeneratorResult; } & HTMLAttributes<SVGSVGElement>) {
    const setShapeParams = useSetAtom(editorShapeParamsAtom);
    return (
        <svg
            className={classNames("fill-transparent touch-none bg-primary-50 border-white border-4 cursor-pointer", className)}
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            preserveAspectRatio="none"
            onClick={() => setShapeParams(shapeParams)}
            {...rest}
        >
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
        </svg>
    );
}

//const isNonNull = <T>(x: T): x is NonNullable<T> => x != null;
function isNonNull<T>(x: T): x is NonNullable<T> {
    return !!x;
}

function ShapePresets() {
    const shapes = useAtomValue(vaultData.shapesAtom);
    const shapeParamArray = shapes.map((shapeStr) => {
        const res = IO.shapeFromString(shapeStr);
        // return typeof res === 'string' ? undefined : res; //No
        // return typeof res === 'string' ? undefined : res; //OK1
        // return typeof res === 'string' ? false : res; //OK2
        // return typeof res === 'string' ? undefined : res; //OK3

        return typeof res === 'string' ? null : res;
    }).filter(isNonNull);

    //}).filter(Boolean); //No
    // }).filter(Boolean) as Exclude<ReturnType<typeof IO.shapeFromString>, undefined | string>[]; //OK1
    // }).filter(Boolean); //OK2
    // }).filter(isNonNull); //OK3
    return (
        <div className="py-2">
            <div className="max-h-96 px-4 overflow-y-auto bg-primary-100">
                <div className="py-4 grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-1">
                    {shapeParamArray.map(({ shapeParams, shape }, idx) => (
                        <ShapeView shapeParams={shapeParams} shape={shape} key={idx} />
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
        </UISection>
    );
}
