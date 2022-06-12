export function disableHiddenChildren(visible: boolean, parent: HTMLElement | null | undefined) {
    if (!parent) return;

    const inputs = [...(parent.querySelectorAll('input'))];
    if (visible) {
        inputs.forEach((item) => {
            if (item.dataset['disState']) {
                delete item.dataset['disState'];
            } else {
                item.removeAttribute('disabled');
            }
        });
    } else {
        inputs.forEach((item) => {
            if (item.disabled) {
                item.dataset['disState'] = '1';
            } else {
                item.setAttribute('disabled', 'true');
            }
        });
    }
}
