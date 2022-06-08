import { ShapeNgon, NewShapeParams, NewShapeParamsMeta, Point2D } from "./shape-types";
import { uuid } from "@/utils/uuid";

const enum CONST {      // ts defines type by last enum
    defStroke = 0.07,
    sceneSize = 24,     // should not be float
    sceneSizeMax = 256, // should not be float
}

enum CONST_NAMES {
    NAME_NGON = 'ngon',
}

export const defNewShapeParams: NewShapeParams = {
    outerN: 5,
    innerN: 2,
    outerX: 0.3,
    outerY: 6.5,
    innerX: 5.5,
    innerY: 0,
    stroke: CONST.defStroke,

    w: CONST.sceneSize,
    h: CONST.sceneSize,
    ofsX: CONST.sceneSize / 2,
    ofsY: CONST.sceneSize / 2,
    scale: 1,
};

export function initalValueShapeParams(): NewShapeParams {
    return {
        ...defNewShapeParams,
        id: uuid(),
    };
}

export const initialValueNewShapeParamsMeta: NewShapeParamsMeta = {
    outerN: { label: 'outer points', min: 1, max: 100, step: 1, digits: 0, },
    innerN: { label: 'inner points', min: 1, max: 100, step: 1, digits: 0, },
    outerX: { label: 'outer X', min: -100, max: 100, step: 0.01 },
    outerY: { label: 'outer Y', min: -100, max: 100, step: 0.01 },
    innerX: { label: 'inner X', min: -100, max: 100, step: 0.01 },
    innerY: { label: 'inner Y', min: -100, max: 100, step: 0.01 },
    stroke: { label: 'stroke', min: 0.01, max: 2, step: 0.01 },

    w: { label: 'width', min: 4, max: CONST.sceneSizeMax, step: 1, digits: 0, },
    h: { label: 'height', min: 4, max: CONST.sceneSizeMax, step: 1, digits: 0, },
    ofsX: { label: 'center X', min: -CONST.sceneSizeMax / 2, max: CONST.sceneSizeMax / 2, step: .1 },
    ofsY: { label: 'center Y', min: -CONST.sceneSizeMax / 2, max: CONST.sceneSizeMax / 2, step: .1 },
    scale: { label: 'scale', min: 0.01, max: 3, step: 0.01 },
};
//TODO: digits 2
//TODO: pairs lock

// Storage formats

export interface StorageScene { // Persistent format of Scene
    w: number;          // Scene.w
    h: number;          // Scene.h
    cx?: number;        // Scene.ofsX
    cy?: number;        // Scene.ofsY
    z?: number;         // Scene.scale
}

export interface StorageNgon { // Persistent format of ShapeParams
    na: number;         // ShapeNgon.nOuter
    nb: number;         // ShapeNgon.nInner
    lna: Point2D;       // ShapeNgon.lenOuter
    lnb: Point2D;       // ShapeNgon.lenInner
    stk?: number;       //
    scn: StorageScene;  //
    id?: string;        // ShapeNgon.id
    gen?: string;       // ShapeNgon.gen
}

export namespace IO {
    export function ShapeNgonToStorage(shape: ShapeNgon): StorageNgon {
        let rv: StorageNgon = {
            na: shape.outerN,
            nb: shape.innerN,
            lna: shape.outer,
            lnb: shape.inner,
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
            outerN: storage.na,
            innerN: storage.nb,
            outer: storage.lna,
            inner: storage.lnb,
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
} //namespace IO
