import { HTMLAttributes } from "react";
import { NewShapeParams } from "@/store/ngon/types-shape";
import { GeneratorResult } from "@/store/ngon/generator";
import { classNames } from "@/utils/classnames";

type PreviewBoxProps = {
    shapeParams: NewShapeParams;
    shape: GeneratorResult;
};

export function PreviewBox({ shapeParams, shape, className, ...rest }: PreviewBoxProps & HTMLAttributes<SVGSVGElement>) {
    return (
        <svg
            className={classNames("fill-transparent touch-none", className)}
            viewBox={`0 0 ${shapeParams.w} ${shapeParams.h}`}
            {...rest}
        >
            <path className="stroke-current" style={{ strokeWidth: shapeParams.stroke }} d={shape.d} />
        </svg>
    );
}
