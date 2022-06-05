export type Point2D = {
    x: number;
    y: number;
};

// In editor formats

export type Scene = {
    w: number;          // Scene width
    h: number;          // Scene height
    ofsX: number;       // Center offset X (from top left corner)
    ofsY: number;       // Center offset Y (from top left corner)
    scale: number;      // Scene scale, zoom
};

export type ShapeNgon = {
    outerN: number;     // Number of outer points
    innerN: number;     // Number of inner points
    outer: Point2D;     // length outer vector
    inner: Point2D;     // length inner vector
    stroke: number;     // Stroke width
    scene: Scene;       // Scene params
    id?: string;        // Relatively unique shape ID or generated
    gen?: string;       // Generator name: 'ngon'
};

//////////////////

// type ArrTwo = [number, number]; // [x, y] or [w, h]

// export type NewShapeParams4 = { // TODO: can it be more then one inner ?
//     outerN: number;     // Number of outer points
//     innerN: number;     // Number of inner points
//     outer: ArrTwo;      // Outer lenght x, y aka scale
//     inner: ArrTwo;      // Inner lenght x, y aka scale
//     stroke: number;     // Stroke width

//     size: ArrTwo;       // Box width, height
//     offset: ArrTwo;     // shape offset x, y // TODO: should it be cx, cy?
//     scale: number;      // scene scale

//     id?: string;        // shape ID
//     genId?: string;     // shape generator name aka 'ngon'
// };

export type NewShapeParams = { // TODO: can it be more then one inner ?
    outerN: number;     // Number of outer points
    innerN: number;     // Number of inner points
    outerX: number;     // Outer lenght x aka scale
    outerY: number;     // Outer lenght y aka scale
    innerX: number;     // Inner lenght x aka scale
    innerY: number;     // Inner lenght y aka scale
    stroke: number;     // Stroke width

    w: number;          // Box width
    h: number;          // Box height
    ofsX: number;       // shape offset x
    ofsY: number;       // shape offset y // TODO: should it be cx, cy?
    scale: number;      // scene scale

    id?: string;        // shape ID
    genId?: string;     // shape generator name aka 'ngon'
};

export type NewShapeParamsMetaItem = {
    label: string;
    min: number;
    max: number;
    step: number;
    digits?: number;    // if defined number will be rounded before apply
};

export type NewShapeParamsMeta = {
    outerN: NewShapeParamsMetaItem;
    innerN: NewShapeParamsMetaItem;
    outerX: NewShapeParamsMetaItem;
    outerY: NewShapeParamsMetaItem;
    innerX: NewShapeParamsMetaItem;
    innerY: NewShapeParamsMetaItem;
    stroke: NewShapeParamsMetaItem;

    w: NewShapeParamsMetaItem;
    h: NewShapeParamsMetaItem;
    ofsX: NewShapeParamsMetaItem;
    ofsY: NewShapeParamsMetaItem;
    scale: NewShapeParamsMetaItem;
};

//////////////////


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
