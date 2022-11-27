import { useAtomValue } from 'jotai';
import { dataLoadAtom } from './store/store';
import { App2_Main } from './components/App2_Main';
import { UIToaster } from './components/UI/UiToaster';
import { UISymbolsDefs } from './components/UI/Icons/UIIcons';
import './App.scss';

function DataLoader() {
    useAtomValue(dataLoadAtom);
    return null;
}

function PopperRoot() {
    return (
        <div className="absolute z-50">
            <div id="portal"></div>
        </div>
    );
}

function App() {
    return (<>
        <UIToaster />
        <PopperRoot />
        <UISymbolsDefs />
        <DataLoader />
        <div className="min-h-full overflow-hidden bg-slate-50">
            <App2_Main />
        </div>
    </>);
}

export default App;
