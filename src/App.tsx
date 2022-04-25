import { useAtomValue } from 'jotai';
import { dataLoadAtom } from './store/store';
import { Frontpage } from './components/Frontpage';
import { UIToaster } from './components/UI/UiToaster';
import { UISymbolsDefs } from './components/UI/UIIcons';
import './App.css';

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
            <Frontpage />
        </div>
    </>);
}

export default App;
