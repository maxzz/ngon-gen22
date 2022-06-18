import { Atom, atom, Getter, Setter } from 'jotai';
import { Atomize, atomWithCallback } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';
import { initalValueShapeParams } from './ngon/shape-defaults';
import { NewShapeParams } from './ngon/shape';
import { defaultShapes } from './ngon/shapes-vault-data';
import { generate } from './ngon/generator';
import { IO, } from './ngon/shape-io';
import { toastError } from '@/components/UI/UiToaster';

//#region LocalStorage

namespace Storage {
    const KEY = 'react-svg-shapes22-01';

    type Store = {
        open: OpenSections;
        shapeParams: NewShapeParams;
        viewboxOptions: ViewboxOptions;
        vaultData: VaultData;
    };

    export let initialData: Store = {
        open: {
            presets: false,
            variants: false,
        },
        shapeParams: initalValueShapeParams(),
        viewboxOptions: {
            showBox: false,
            showUtils: false,
            showAll: false,
            showInnerLines: true,
            showOuterLines: true,
            showInnerDots: true,
            showOuterDots: true,
        },
        vaultData: {
            shapes: [],
        }
    };

    function load() {
        const s = localStorage.getItem(KEY);
        if (s) {
            try {
                let obj = JSON.parse(s) as Store;
                initialData = { ...initialData, ...obj };

                initialData.vaultData.shapes = initialData.vaultData?.shapes?.length ? initialData.vaultData.shapes : defaultShapes;
            } catch (error) {
            }
        }
    }
    load();

    export const saveDebounced = debounce(function _save(get: Getter) {
        let newStore: Store = {
            open: {
                presets: get(openSections.presetsAtom),
                variants: get(openSections.variantsAtom),
            },
            shapeParams: get(editorShapeParamsAtom),
            viewboxOptions: {
                showBox: get(viewboxOptionAtoms.showBoxAtom),
                showUtils: get(viewboxOptionAtoms.showUtilsAtom),
                showAll: get(viewboxOptionAtoms.showAllAtom),
                showInnerLines: get(viewboxOptionAtoms.showInnerLinesAtom),
                showOuterLines: get(viewboxOptionAtoms.showOuterLinesAtom),
                showInnerDots: get(viewboxOptionAtoms.showInnerDotsAtom),
                showOuterDots: get(viewboxOptionAtoms.showOuterDotsAtom),
            },
            vaultData: {
                shapes: get(vaultData.shapesAtom),
            },
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => Storage.saveDebounced(get);
}

//#endregion LocalStorage

// Data files

//#region Vault loader

type VaultData = {
    shapes: string[];
};

const vaultData: Atomize<VaultData> = {
    shapesAtom: atom<string[]>([]),
};

type VaultSpapesArray = {
    valid: IO.ConvertResult[];
    failed: string[];
};

function saveVaultDataArray({ get, set }: { get: Getter, set: Setter; }) {
    const valid = get(vaultSpapesArray.validAtom);
    const failed = get(vaultSpapesArray.failedAtom);
    const arr = [...IO.convertResultForVault(valid), ...failed];
    set(vaultData.shapesAtom, arr);
    Storage.saveDebounced(get);
}

export const vaultSpapesArray: Atomize<VaultSpapesArray> = {
    validAtom: atomWithCallback<IO.ConvertResult[]>([], saveVaultDataArray),
    failedAtom: atomWithCallback<string[]>([], saveVaultDataArray),
};

const runFetchReleaseNotesAtom = atom(
    (get) => null,
    (_get, set) => {
        const { parsedShapes, failedShapes, } = IO.parseVaultShapes(Storage.initialData.vaultData.shapes);
        set(vaultSpapesArray.validAtom, parsedShapes);
        set(vaultSpapesArray.failedAtom, failedShapes);
        //toastError('test');
    }
);
runFetchReleaseNotesAtom.onMount = (runFetch) => runFetch();

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchReleaseNotesAtom);
    }
);

//#endregion Vault loader

//#region UI state

type OpenSections = {
    presets: boolean;   // shape collection previews
    variants: boolean;  // multiplication
};

export const openSections: Atomize<OpenSections> = {
    presetsAtom: atomWithCallback<boolean>(Storage.initialData.open.presets, Storage.save),
    variantsAtom: atomWithCallback<boolean>(Storage.initialData.open.variants, Storage.save),
};

// Editor shape

export const editorShapeParamsAtom = atomWithCallback(Storage.initialData.shapeParams, Storage.save);

export const editorShapeAtom = atom(
    (get) => {
        const params = get(editorShapeParamsAtom);
        const shape = generate(params);
        return shape;
    }
);

//#endregion UI state

//#region Editor controls

type ViewboxOptions = {
    showBox: boolean;           // show box controls
    showUtils: boolean;         // show utility controls
    showAll: boolean;           // override current show values at once, i.e. open (interested) or closed (don't bother me)
    showInnerLines: boolean;
    showOuterLines: boolean;
    showInnerDots: boolean;
    showOuterDots: boolean;
};

export const viewboxOptionAtoms: Atomize<ViewboxOptions> = {
    showBoxAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showBox, Storage.save),
    showUtilsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showUtils, Storage.save),
    showAllAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showAll, Storage.save),
    showInnerLinesAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showInnerLines, Storage.save),
    showOuterLinesAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showOuterLines, Storage.save),
    showInnerDotsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showInnerDots, Storage.save),
    showOuterDotsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showOuterDots, Storage.save),
};

//#endregion Editor controls

//#region Vault shapes

export const doSaveToVaultAtom = atom(null,
    (get, set,) => {
        const shapeParams = get(editorShapeParamsAtom);
        const shapeStr = JSON.stringify(IO.ShapeNgonToStorage(shapeParams));
        set(vaultData.shapesAtom, (p) => [...p, shapeStr]);
    }
);

export const doRemoveFromVaultAtom = atom(null,
    (get, set, idx: number) => {
        //TODO: should have access by Id or by index is enough?
        const shapes = get(vaultData.shapesAtom);
        const newShapes = shapes.slice(0, idx).concat(shapes.slice(idx + 1));
        set(vaultData.shapesAtom, newShapes);
    }
);

export const doLoadVaultAtom = atom(null,
    (get, set, idx: number) => {
    }
);

//#endregion Vault shapes

//export const vaultShapesAtom = atomWithCallback<string[]>(Storage.initialData.vaultData.shapes, Storage.save);

//export const faildedShapesAtom = atom<string[]>([]);

/*cannot clear failed messages from get()* /
export const vaultParsedshapesAtom = atom(
    (get) => {
        const vaultShapes = get(vaultShapesAtom);

        const failedShapes: string[] = [];

        const parsedShapes = vaultShapes.map((shapeStr) => {
            const res = IO.shapeFromString(shapeStr);
            if (typeof res === 'string') {
                failedShapes.push(res);
            } else {
                return res;
            }
        }).filter(isNonNull);

        failedShapes.push('failed test');

        return {
            parsedShapes,
            failedShapes,
        };
    }
);
/**/
//////////////////////
