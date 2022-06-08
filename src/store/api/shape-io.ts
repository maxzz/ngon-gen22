import { Point2D, ShapeNgon } from "./shape";
import { CONST, CONST_NAMES } from "./shape-defaults";
import { uuid } from "@/utils/uuid";

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
