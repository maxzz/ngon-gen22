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

function isInnerPoint(idx: number, innerN: number, swap?: boolean): boolean {
    const v = idx % innerN !== 0;
    return swap ? !v : v;
}

function isOuterPoint(idx: number, innerN: number, swap?: boolean): boolean {
    const v = idx % innerN === 0;
    return swap ? !v : v;
}

export function generate(params: NewShapeParams): GeneratorResult {

    // generate points
    let points = createNGonPoints(params.outerN * params.innerN);

    // scale inner and outer points
    points = points.map(([x, y], index) => {
        return isInnerPoint(index, params.innerN, params.swap)
            ? [x * params.innerX, y * params.innerY]
            : [x * params.outerX, y * params.outerY];
    });

    // scene scale
    points = points.map(([x, y]) => {
        return [x * params.scale, y * params.scale];
    });

    // offset
    points = points.map(([x, y]) => [x + params.ofsX, y + params.ofsY]);

    // round
    points = points.map(([x, y]) => [rnd2(x), rnd2(y)]);

    // generate line
    let d = points.length ? `M${points[0][0]},${points[0][1]}` +
        points.map(([x, y], index) => {
            return !index ? '' : `L${x},${y}`;
        }).join('') +
        `z` : '';

    return {
        d,
        points,
        start: {
            cx: points[0]?.[0] || 0,
            cy: points[0]?.[1] || 0,
        },
        center: {
            x: params.w / 2,
            y: params.h / 2,
        }
    };
}

export function separatePoints(points: [number, number][], innerN: number, swap?: boolean) {
    const outerPts = points.filter((_, idx) => isOuterPoint(idx, innerN, swap));
    const innerPts = points.filter((_, idx) => isInnerPoint(idx, innerN, swap));
    return {
        outerPts,
        innerPts,
    };
}

export function pointsToLines(pts: [number, number][], centerX: number, centerY: number) {
    return pts.map(([x, y]) => `M${centerX},${centerY}L${x},${y}`);
}

export function generateSvg(path: string, w: number, h: number, stroke: number) {
    let style = `<style> path { stroke-width: ${stroke}; fill: none; stroke: red; } </style>`;
    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">\n    <path d="${path}"/>\n    ${style}\n</svg>`;
}

export function createShading(shapeParams: NewShapeParams, shape: GeneratorResult) {
    const shades = [];

    // const { x: cx, y: cy } = shape.center;
    const cx = shapeParams.ofsX; const cy = shapeParams.ofsY;

    for (let i = 0; i < shape.points.length - 1; i = i + 2) {
        const a = shape.points[i];
        const b = shape.points[i + 1];
        shades.push(`M${cx} ${cy}L${a[0]} ${a[1]}L${b[0]} ${b[1]}z`);
    }

    return shades;
}
