import { openSections } from '@/store';
import { Title } from './title';
import { ShapePresets } from './previews-list';
import { UISection } from '../../UI/section/UISection';
import './Dragging.css';

export function Section3_Presets() {
    return (
        <UISection className="py-0" openAtom={openSections.presetsAtom} title={<Title />}>
            <ShapePresets />
        </UISection>
    );
}

//TODO: combine the image icon with the trash can icon.
//TODO: add confirmation for add remove operations
//TODO: move keep shape to canvas
//TODO: add index numbers to each preview
//TODO: ctrl+click on save button should console all shapes w/ indices for default
//TODO: scroll presets view box to the new added shape
