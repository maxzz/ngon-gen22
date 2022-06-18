import { NewShapeParams } from "./shape";
import { CONST, CONST_NAMES, initalValueShapeParams } from "./shape-defaults";
import { generate, GeneratorResult } from "./generator";
import { uuid } from "@/utils/uuid";
import { isNonNull } from "@/utils/tsX";

// Storage formats

export type Point2D = {
    x: number;
    y: number;
};

export namespace StorageData {

    export interface Scene { // Persistent format of Scene
        w: number;          // Scene.w
        h: number;          // Scene.h
        cx?: number;        // Scene.ofsX
        cy?: number;        // Scene.ofsY
        z?: number;         // Scene.scale
    }

    export interface Gadgets {
        iLn: boolean;       // Show inner lines
        oLn: boolean;       // Show outer lines
        iDt: boolean;       // Show inner dots
        oDt: boolean;       // Show outer dots
        swp: boolean;       // swap inner and outer
    }

    export interface Ngon { // Persistent format of ShapeParams
        na: number;         // ShapeNgon.nOuter
        nb: number;         // ShapeNgon.nInner
        lna: Point2D;       // ShapeNgon.lenOuter
        lnb: Point2D;       // ShapeNgon.lenInner
        stk?: number;       //
        scn: Scene;  //
        show?: Gadgets;
        id?: string;        // ShapeNgon.id
        gen?: string;       // ShapeNgon.gen
    }

} //namespace StorageData

export namespace IO {
    export function ShapeNgonToStorage(shape: NewShapeParams): StorageData.Ngon {
        let rv: StorageData.Ngon = {
            na: shape.outerN,
            nb: shape.innerN,
            lna: { x: shape.outerX, y: shape.outerY },
            lnb: { x: shape.innerX, y: shape.innerY },
            ...(shape.stroke !== CONST.defStroke && { stk: shape.stroke }),
            scn: {
                w: shape.w,
                h: shape.h,
                ...(shape.ofsX !== shape.w / 2 && { cx: shape.ofsX }),
                ...(shape.ofsY !== shape.h / 2 && { cy: shape.ofsY }),
                ...(shape.scale !== 1 && { z: shape.scale }),
            },
            id: shape.id,
            ...(shape.genId && shape.genId !== CONST_NAMES.NAME_NGON && { gen: shape.genId }),
        };
        return rv;
    }

    function ShapeNgonFromStorage(storage: StorageData.Ngon): { params: NewShapeParams; } {
        let w = storage.scn && storage.scn.w || CONST.sceneSize;
        let h = storage.scn && storage.scn.h || CONST.sceneSize;
        let rv: NewShapeParams = {
            outerN: storage.na,
            innerN: storage.nb,
            outerX: storage.lna.x,
            outerY: storage.lna.y,
            innerX: storage.lnb.x,
            innerY: storage.lnb.y,
            stroke: storage.stk || CONST.defStroke,

            w: w,
            h: h,
            ofsX: storage.scn && storage.scn.cx || w / 2,
            ofsY: storage.scn && storage.scn.cy || h / 2,
            scale: storage.scn && storage.scn.z || 1,

            id: storage.id || uuid(),
            genId: storage.gen || CONST_NAMES.NAME_NGON,
        };
        return {
            params: rv,
        };
    }

    export type ConvertResult = {
        shapeParams: NewShapeParams;
        shape: GeneratorResult;
        gadgets?: StorageData.Gadgets;
    };

    /**
     * Create shape from string.
     * @param shapeStr packed string of StorageData.Ngon
     * @returns ConvertResult or original string if failed to parse it.
     */
    export function shapeFromString(shapeStr: string): ConvertResult | string {
        try {
            const p = JSON.parse(shapeStr) as StorageData.Ngon;
            const storeData = ShapeNgonFromStorage(p);
            const shapeParams = { ...initalValueShapeParams(), ...storeData.params };
            const shape = generate(shapeParams);
            //JSON.parse(''); // to debug error behaviour
            return {
                shapeParams,
                shape,
                //gadgets
            };
        } catch (error) {
            return shapeStr;
        }
    }

    export function parseVaultShapes(vaultShapes: string[]) {
        const failedShapes: string[] = [];
        const parsedShapes = vaultShapes.map((shapeStr) => {
            const res = IO.shapeFromString(shapeStr);
            if (typeof res === 'string') {
                failedShapes.push(res);
            } else {
                return res;
            }
        }).filter(isNonNull);
        return {
            parsedShapes,
            failedShapes,
        };
    }
    
    export function convertResultForVault(arr: ConvertResult[]): string[] {
        return arr.map((item) => {
            const ngon: StorageData.Ngon = IO.ShapeNgonToStorage(item.shapeParams);
            return JSON.stringify(ngon);
        });
    }

} //namespace IO
