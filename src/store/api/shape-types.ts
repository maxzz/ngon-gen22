export type Point2D = {
    x: number;
    y: number;
}

// In editor formats

export type Scene = {
    w: number;          // Scene width
    h: number;          // Scene height
    scale: number;      // Scene scale, zoom
    ofsX: number;       // Center offset X (from top left corner)
    ofsY: number;       // Center offset Y (from top left corner)
}

export type ShapeNgon = {
    nOuter: number;     // Number of outer points
    nInner: number;     // Number of inner points
    lenOuter: Point2D;  // length outer vector
    lenInner: Point2D;  // length inner vector
    scene: Scene;       // Scene params
    stroke: number;     // Stroke width
    gen?: string;       // Generator name: 'ngon'
    id: string;         // Relatively unique shape ID or generated
}

// Storage formats

export interface StorageScene { // Persistent format of Scene
    w: number;          // Scene.w
    h: number;          // Scene.h
    z?: number;         // Scene.scale
    cx?: number;        // Scene.ofsX
    cy?: number;        // Scene.ofsY
}

export interface StorageNgon { // Persistent format of ShapeParams
    na: number;         // ShapeNgon.nOuter
    nb: number;         // ShapeNgon.nInner
    lna: Point2D;       // ShapeNgon.lenOuter
    lnb: Point2D;       // ShapeNgon.lenInner
    stk?: number;       //
    scn: StorageScene;    //
    gen?: string;       // ShapeNgon.gen
    id?: string;        // ShapeNgon.id
}
