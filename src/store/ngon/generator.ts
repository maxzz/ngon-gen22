import { rnd2 } from "@/utils/numbers";
import { NewShapeParams } from "./shape";

function createNGonPoints(n: number): [number, number][] {
    //n = Math.round(n);
    let polygon = new Array(n);
    for (var i = n; i--;) {
        let angle = (360 / n) * i - 90;
        let radians = (angle * Math.PI) / 180;
        polygon[i] = [Math.cos(radians), Math.sin(radians)];
    }
    return polygon;
}

export type GeneratorResult = {
    d: string;
    points: [number, number][];
    start: {
        cx: number;
        cy: number;
    };
    center: {
        x: number;
        y: number;
    };
};

export function generate(params: NewShapeParams): GeneratorResult {

    // generate points
    let points = createNGonPoints(params.outerN * params.innerN);

    // scale inner and outer points
    points = points.map((pt, index) => {
        return index % params.innerN === 0
            ? [pt[0] * params.innerX, pt[1] * params.innerY]
            : [pt[0] * params.outerX, pt[1] * params.outerY];
    });

    // scene scale
    points = points.map((pt) => {
        return [pt[0] * params.scale, pt[1] * params.scale];
    });

    // offset
    points = points.map((pt) => [pt[0] + params.ofsX, pt[1] + params.ofsY]);

    // round
    points = points.map((pt) => [rnd2(pt[0]), rnd2(pt[1])]);

    // generate line
    let d = `M${points[0][0]},${points[0][1]}` +
        points.map((pt, index) => {
            return !index ? '' : `L${pt[0]},${pt[1]}`;
        }).join('') +
        `z`;

    return {
        d,
        points,
        start: {
            cx: points[0][0],
            cy: points[0][1],
        },
        center: {
            x: params.w / 2,
            y: params.h / 2,
        }
    };
}
