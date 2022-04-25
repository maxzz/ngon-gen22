import { ShapeNgon } from "./shape-types";
import { rnd2 } from "./shape-utils";

function createNGonPoints(n: number): [number, number][] {
    let polygon = new Array(n);
    for (var i = n; i--;) {
        let angle = (360 / n) * i - 90;
        let radians = (angle * Math.PI) / 180;
        polygon[i] = [Math.cos(radians), Math.sin(radians)];
    }
    return polygon;
}

export function generate(params: ShapeNgon) {

    // generate points
    let points = createNGonPoints(params.nOuter * params.nInner);

    // scale inner and outer points
    points = points.map((pt, index) => {
        return index % params.nInner === 0
            ? [pt[0] * params.lenInner.x, pt[1] * params.lenInner.y]
            : [pt[0] * params.lenOuter.x, pt[1] * params.lenOuter.y];
    });

    // scene scale
    points = points.map((pt) => {
        return [pt[0] * params.scene.scale, pt[1] * params.scene.scale];
    });

    // offset
    points = points.map((pt) => [pt[0] + params.scene.ofsX, pt[1] + params.scene.ofsY]);

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
            x: params.scene.w / 2,
            y: params.scene.h / 2,
        }
    };
}
