import { NewShapeParams } from "./types-shape";
import { CONST, CONST_NAMES, initalValueShapeParams } from "./new-shape-defaults";
import { generate, GeneratorResult } from "./generator";
import { uuid } from "@/utils/uuid";
import { isNonNull } from "@/utils/tsX";

// Storage formats

export namespace StorageData {

    type Point2D = {
        x: number;
        y: number;
    };

    interface Scene {       // Persistent format of Scene
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
        swap?: boolean;     // swap controls
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
            swap: shape.swap,
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

            ...(storage.swap !== undefined && { swap: !!storage.swap }),
            id: storage.id || uuid(),
            genId: storage.gen || CONST_NAMES.NAME_NGON,
        };
        return {
            params: rv,
        };
    }

    export type ConvertResult = {
        id: string;
        shapeParams: NewShapeParams;
        shape: GeneratorResult;
        gadgets?: StorageData.Gadgets;
    };

    /**
     * Create shape from string.
     * @param shapeStr packed string of StorageData.Ngon
     * @returns ConvertResult or original string if failed to parse it.
     */
    function shapeFromString(shapeStr: string): ConvertResult | string {
        try {
            const p = JSON.parse(shapeStr) as StorageData.Ngon;
            const storeData = ShapeNgonFromStorage(p);
            const shapeParams = { ...initalValueShapeParams(), ...storeData.params };
            const shape = generate(shapeParams);
            //JSON.parse(''); // to trigger debug error
            return {
                id: shapeParams.id,
                shapeParams,
                shape,
                //gadgets
            };
        } catch (error) {
            return shapeStr;
        }
    }

    export function parseVaultShapes(vaultShapes: string[]) {
        const ids = new Set<string | undefined>();
        const failedShapes: string[] = [];
        const parsedShapes = vaultShapes.map((shapeStr) => {
            const res = shapeFromString(shapeStr);
            if (typeof res === 'string') {
                failedShapes.push(res);
            } else {
                if (!res.shapeParams.id || ids.has(res.shapeParams.id)) {
                    res.id = res.shapeParams.id = uuid();
                }
                ids.add(res.shapeParams.id);
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
            const ngon: StorageData.Ngon = ShapeNgonToStorage(item.shapeParams);
            return JSON.stringify(ngon);
        });
    }

    export function makeUniqueIds(shapes: ConvertResult[]): ConvertResult[] {
        const ids = new Set<string | undefined>();
        const rv: ConvertResult[] = shapes.map((shape) => {

            if (ids.has(shape.shapeParams.id)) { // reset id if it is not unique, so later it will be removed
                shape.id = shape.shapeParams.id = '';
                return shape;
            }

            if (!shape.shapeParams.id) {
                shape.id = shape.shapeParams.id = uuid();
            }
            ids.add(shape.shapeParams.id);

            return shape;
        });
        return rv;
    }

    export function uniqueIdsOnly(shapes: ConvertResult[]): ConvertResult[] {
        const ids = new Set<string | undefined>();
        const rv: ConvertResult[] = shapes.reduce((acc: ConvertResult[], shape: ConvertResult) => {
            const key = JSON.stringify({ ...shape.gadgets, ...shape.shapeParams, id: '' });
            if (!ids.has(key)) {
                ids.add(key);
                acc.push(shape);
            }
            return acc;
        }, []);
        return rv;
    }

} //namespace IO
