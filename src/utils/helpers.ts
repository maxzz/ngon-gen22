export function copyToClipboard(el: any): boolean | undefined {
    // 0. el - HTMLElement
    const range: Range = document.createRange();
    range?.selectNode(el);
    window.getSelection()?.addRange(range);

    // 1. Now that we've selected the anchor text, execute the copy command
    let done;
    try {
        done = document.execCommand('copy');
    } catch (err) {
    }

    // 2. Remove the selections - NOTE: Should use removeRange(range) when it is supported
    window.getSelection()?.removeAllRanges();

    return done;
}

export function parseDate(date: string): Date | undefined {
    // 0. Parse '2022.03.04' format to Date | string.
    const dt = new Date(date.replace(/\./g, '-') + 'T00:00:00');
    return dt.toString() !== 'Invalid Date' ? dt : undefined;
}

export function beautifyDate(dateStr?: string): string {
    // 0. Parse '2022.03.04' format to string.
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateStr && parseDate(dateStr)?.toLocaleDateString('en-US', options) || dateStr || '';
}
