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
        open: StorageOpenSections;
        shapeParams: NewShapeParams;
        viewboxOptions: StorageViewboxOptions;
        vaultData: StorageVaultData;
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
                shapes: get(_shapesAtom),
            },
        };
        localStorage.setItem(KEY, JSON.stringify(newStore));
    }, 1000);

    export const save = ({ get }: { get: Getter; }) => Storage.saveDebounced(get);
}

//#endregion LocalStorage

// Data files

//#region Vault loader

type StorageVaultData = {
    shapes: string[];
};

const _shapesAtom = atom<string[]>([]); // keep it as atom to reduce valid shapes packing when shape params changed.

type VaultSpapesArray = {
    valid: IO.ConvertResult[];
    failed: string[];
};

function saveVaultDataArray({ get, set }: { get: Getter, set: Setter; }) {
    const valid = get(vaultSpapesArray.validAtom);
    const failed = get(vaultSpapesArray.failedAtom);
    const arr = [...IO.convertResultForVault(valid), ...failed];
    set(_shapesAtom, arr);
    Storage.saveDebounced(get);
}

export const vaultSpapesArray: Atomize<VaultSpapesArray> = {
    validAtom: atomWithCallback<IO.ConvertResult[]>([], saveVaultDataArray),
    failedAtom: atomWithCallback<string[]>([], saveVaultDataArray),
};

const runFetchVaultShapesAtom = atom(
    () => null,
    (_get, set) => {
        const { parsedShapes, failedShapes, } = IO.parseVaultShapes(Storage.initialData.vaultData.shapes);
        set(vaultSpapesArray.validAtom, parsedShapes);
        set(vaultSpapesArray.failedAtom, failedShapes);
        //toastError('test');
    }
);
runFetchVaultShapesAtom.onMount = (runFetch) => runFetch();

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchVaultShapesAtom);
    }
);

//#endregion Vault loader

//#region UI sections state

type StorageOpenSections = {
    presets: boolean;   // shape collection previews
    variants: boolean;  // multiplication
};

export const openSections: Atomize<StorageOpenSections> = {
    presetsAtom: atomWithCallback<boolean>(Storage.initialData.open.presets, Storage.save),
    variantsAtom: atomWithCallback<boolean>(Storage.initialData.open.variants, Storage.save),
};

//#endregion UI sections state

//#region Editor controls

type StorageViewboxOptions = {
    showBox: boolean;           // show box controls
    showUtils: boolean;         // show utility controls
    showAll: boolean;           // override current show values at once, i.e. open (interested) or closed (don't bother me)

    showInnerLines: boolean;
    showOuterLines: boolean;
    showInnerDots: boolean;
    showOuterDots: boolean;
};

export const viewboxOptionAtoms: Atomize<StorageViewboxOptions> = {
    showBoxAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showBox, Storage.save),
    showUtilsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showUtils, Storage.save),
    showAllAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showAll, Storage.save),
    
    showInnerLinesAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showInnerLines, Storage.save),
    showOuterLinesAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showOuterLines, Storage.save),
    showInnerDotsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showInnerDots, Storage.save),
    showOuterDotsAtom: atomWithCallback<boolean>(Storage.initialData.viewboxOptions.showOuterDots, Storage.save),
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

//#endregion Editor controls

//#region Vault shapes

export const doSaveToVaultAtom = atom(null,
    (get, set,) => {
        const shapeParams = get(editorShapeParamsAtom);
        const shape = generate(shapeParams);
        const gadgets = undefined;
        set(vaultSpapesArray.validAtom, (p) => [...p, {shapeParams, shape, gadgets}]);
    }
);

export const doRemoveFromVaultAtom = atom(null, //TODO: should have access by Id or by index is enough?
    (get, set, idx: number) => {
        const shapes = get(vaultSpapesArray.validAtom);
        const newShapes = shapes.slice(0, idx).concat(shapes.slice(idx + 1));
        set(vaultSpapesArray.validAtom, newShapes);
    }
);

//#endregion Vault shapes
