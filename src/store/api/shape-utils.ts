import { StorageNgon, ShapeNgon, ShapeParams } from "./shape-types";
import { uuid } from "@/utils/uuid";

const enum CONST { // ts defines type by last enum
    defStroke = 0.2,
    sceneSize = 24, // should be an even integer
}

enum CONST_NAMES {
    NAME_NGON = 'ngon',
}

export function rnd2(n: number): number {
    return Math.round(n * 100) / 100;
}

export function dummyShape(): ShapeNgon {
    return {
        nOuter: 5,
        nInner: 2,
        lenOuter: { x: 2.2, y: 2.2 },
        lenInner: { x: 5.2, y: 5.2 },
        scene: {
            w: CONST.sceneSize,
            h: CONST.sceneSize,
            scale: 1,
            ofsX: CONST.sceneSize / 2,
            ofsY: CONST.sceneSize / 2,
        },
        stroke: CONST.defStroke,
        id: uuid(),
    };
}

export const defShapeParams: ShapeParams = {
    outerN: 5,
    innerN: 4,
    outerX: 11,
    outerY: 11,
    innerX: 8,
    innerY: 8,
    stroke: .1,

    scale: 1,
    boxW: 24,
    boxH: 24,
    ofsX: CONST.sceneSize / 2,
    ofsY: CONST.sceneSize / 2,
};

// IO

export function ShapeNgonToStorage(shape: ShapeNgon): StorageNgon {
    let rv: StorageNgon = {
        na: shape.nOuter,
        nb: shape.nInner,
        lna: shape.lenOuter,
        lnb: shape.lenInner,
        scn: {
            w: shape.scene.w,
            h: shape.scene.h,
            ...(shape.scene.scale !== 1 && { z: shape.scene.scale }),
            ...(shape.scene.ofsX !== shape.scene.w / 2 && { cx: shape.scene.ofsX }),
            ...(shape.scene.ofsY !== shape.scene.h / 2 && { cy: shape.scene.ofsY }),
        },
        ...(shape.stroke !== CONST.defStroke && { stk: shape.stroke }),
        ...(shape.gen && shape.gen !== CONST_NAMES.NAME_NGON && { gen: shape.gen }),
        id: shape.id
    };
    return rv;
}

export function ShapeNgonFromStorage(storage: StorageNgon): ShapeNgon {
    let w = storage.scn && storage.scn.w || CONST.sceneSize;
    let h = storage.scn && storage.scn.h || CONST.sceneSize;
    let rv: ShapeNgon = {
        nOuter: storage.na,
        nInner: storage.nb,
        lenOuter: storage.lna,
        lenInner: storage.lnb,
        scene: {
            w: w,
            h: h,
            scale: storage.scn && storage.scn.z || 1,
            ofsX: storage.scn && storage.scn.cx || w / 2,
            ofsY: storage.scn && storage.scn.cy || h / 2,
        },
        stroke: storage.stk || CONST.defStroke,
        gen: storage.gen || CONST_NAMES.NAME_NGON,
        id: storage.id || uuid(),
    };
    return rv;
}
