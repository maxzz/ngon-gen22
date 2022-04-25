import { StorageNgon, ShapeNgon } from "./shape-types";

const enum CONST { // ts defines type by last enum
    defStroke = 0.2,
    sceneSize = 24, // should be an even integer
}

enum CONST_NAMES {
    NAME_NGON = 'ngon',
}

export function uniqueId(v?: number): string {
    return (v || Date.now()).toString(36); // v is for balk generation within 1ms.
}

export function rnd2(n: number): number {
    return Math.round(n * 100) / 100;
}

export const dummyShape: ShapeNgon = {
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
    id: uniqueId()
};

// IO

export function ShapeNgonToStorage(p: ShapeNgon): StorageNgon {
    let rv: StorageNgon = {
        na: p.nOuter,
        nb: p.nInner,
        lna: p.lenOuter,
        lnb: p.lenInner,
        scn: {
            w: p.scene.w,
            h: p.scene.h,
            ...(p.scene.scale !== 1 && { z: p.scene.scale }),
            ...(p.scene.ofsX !== p.scene.w / 2 && { cx: p.scene.ofsX }),
            ...(p.scene.ofsY !== p.scene.h / 2 && { cy: p.scene.ofsY }),
        },
        ...(p.stroke !== CONST.defStroke && { stk: p.stroke }),
        ...(p.gen && p.gen !== CONST_NAMES.NAME_NGON && { gen: p.gen }),
        id: p.id
    };
    return rv;
}

export function ShapeNgonFromStorage(p: StorageNgon, id?: number): ShapeNgon {
    let w = p.scn && p.scn.w || CONST.sceneSize;
    let h = p.scn && p.scn.h || CONST.sceneSize;
    let rv: ShapeNgon = {
        nOuter: p.na,
        nInner: p.nb,
        lenOuter: p.lna,
        lenInner: p.lnb,
        scene: {
            w: w,
            h: h,
            scale: p.scn && p.scn.z || 1,
            ofsX: p.scn && p.scn.cx || w / 2,
            ofsY: p.scn && p.scn.cy || h / 2,
        },
        stroke: p.stk || CONST.defStroke,
        gen: p.gen || CONST_NAMES.NAME_NGON,
        id: p.id || uniqueId(id),
    };
    return rv;
}
