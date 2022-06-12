import React, { HTMLAttributes } from "react";
import { useAtomValue } from "jotai";
import { editorShapeAtom, editorShapeParamsAtom, viewboxOptionAtoms } from "@/store/store";
import { ShapeViewGadgets } from "./ShapeViewGadgets";


export function ShapeView(props: HTMLAttributes<SVGSVGElement>) {
    const shapeParams = useAtomValue(editorShapeParamsAtom);
    const shape = useAtomValue(editorShapeAtom);
    return (
        <svg
            className="w-full h-full fill-transparent"
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            preserveAspectRatio="none"
            
            onClick={(e) => console.log('eve', e)} //TODO: single click handler

            {...props}
        >
            <path className="stroke-primary-900" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
            <ShapeViewGadgets shapeParams={shapeParams} shape={shape} />
        </svg>
    );
}

//TODO: single click handler
//TODO: triangles shading
//TODO: curves vs. lines
//TODO: divide inner lines to sub-lines
//TODO: preview svg instead of text preview
//TODO: implement hint tooltip
//TODO: box size goes to the viewbox as overlay
