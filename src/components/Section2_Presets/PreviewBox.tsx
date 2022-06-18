import { HTMLAttributes } from "react";
import { NewShapeParams } from "@/store/ngon/shape";
import { GeneratorResult } from "@/store/ngon/generator";
import { classNames } from "@/utils/classnames";

export function PreviewBox({ shapeParams, shape, className, ...rest }: { shapeParams: NewShapeParams, shape: GeneratorResult; } & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg
            className={classNames("fill-transparent touch-none text-primary-900 bg-primary-50 border-white border-4 cursor-pointer", className)}
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            {...rest}
        >
            <path className="stroke-current" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
        </svg>
    );
}
