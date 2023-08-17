import React, { HTMLAttributes } from 'react';
import { useAtomValue } from 'jotai';
import { editorShapeAtom, editorShapeParamsAtom, openSections, } from '../../../store';
import { UISection } from '../../UI/Section/UISection';
import { generateSvg } from '@/store/ngon/generator';
import { classNames } from '@/utils/classnames';
import { previewBoxShadow } from '../1-editor';

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

function Section11_Source_Container() {
    return (
        <div className="py-2">
            <div className="notes max-h-96 px-4 overflow-y-auto bg-slate-100">
                <ShapeViewText />
            </div>
        </div>
    );
}

export function Section2_Source() {
    return (
        <UISection openAtom={openSections.sourceAtom} title={"code"}>
            <Section11_Source_Container />
        </UISection>
    );
}
