import { Atom, atom, Getter } from 'jotai';
import { Atomize, atomWithCallback, LoadingDataState, loadingDataStateInit } from '@/hooks/atomsX';
import { debounce } from '@/utils/debounce';
import { toastError } from '@/components/UI/UiToaster';
import { initalValueShapeParams } from './ngon/shape-defaults';
import { NewShapeParams } from './ngon/shape';
import { generate } from './ngon/generator';
import { defaultShapes } from './ngon/shapes-vault-data';
import { IO } from './ngon/shape-io';
import { isNonNull } from '@/utils/tsX';
export { defaultShapes } from './ngon/shapes-vault-data';

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

//#region ServerReleaseNotes

const releaseNotesStateAtom = atom<LoadingDataState<string>>(loadingDataStateInit());

const runFetchReleaseNotesAtom = atom(
    (get) => get(releaseNotesStateAtom),
    (_get, set) => {
        async function fetchData() {
            set(releaseNotesStateAtom, (prev) => ({ ...prev, loading: true }));
            try {
                // const notesText = await fetchReleaseNotes();
                // const markdown = marked(notesText);
                // set(releaseNotesStateAtom, { loading: false, error: null, data: markdown });
                set(releaseNotesStateAtom, { loading: false, error: null, data: null });
            } catch (error) {
                set(releaseNotesStateAtom, { loading: false, error, data: null });
                toastError((error as Error).message);
            }
            set(correlateAtom);
        };
        fetchData();
    }
);
runFetchReleaseNotesAtom.onMount = (runFetch) => runFetch();

export const releaseNotesAtom = atom<string>((get) => get(releaseNotesStateAtom).data || '');

//#endregion ServerReleaseNotes

export const dataLoadAtom = atom(
    (get) => {
        get(runFetchReleaseNotesAtom);
    }
);

// Derivative data

const correlateAtom = atom(
    null,
    (get, set) => {
        const stateNotes = get(releaseNotesStateAtom);
        if (stateNotes.loading) {
            return;
        }
    }
);

// UI state

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

// editor controls

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

// Vault shapes

type VaultData = {
    shapes: string[];
};

export const vaultData: Atomize<VaultData> = {
    shapesAtom: atomWithCallback<string[]>(Storage.initialData.vaultData.shapes, Storage.save),
};

export const vaultShapesAtom = atomWithCallback<string[]>(Storage.initialData.vaultData.shapes, Storage.save);

export const doSaveToVaultAtom = atom(null,
    (get, set, ) => {
        const shapeParams = get(editorShapeParamsAtom);
        const shapeStr = JSON.stringify(IO.ShapeNgonToStorage(shapeParams));
        set(vaultData.shapesAtom, (p) => [...p, shapeStr]);
    }
);

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
