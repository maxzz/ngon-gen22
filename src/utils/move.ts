/**
 * Moves an array item from one position in an array to another.
 * 
 * Note: This is a pure function so a new array will be returned, instead
 * of altering the array argument.
 * 
 * @param {Array} array - Array in which to move an item.
 * @param {number} fromIndex The index of the item to move.
 * @param {number} toIndex  The index to move item at fromIndex to.
 * @returns new array
 */
export function move<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const item = array[fromIndex];
    const length = array.length;
    const diff = fromIndex - toIndex;

    if (diff > 0) {
        // move left
        return [
            ...array.slice(0, toIndex),
            item,
            ...array.slice(toIndex, fromIndex),
            ...array.slice(fromIndex + 1, length)
        ];
    } else if (diff < 0) {
        // move right
        const targetIndex = toIndex + 1;
        return [
            ...array.slice(0, fromIndex),
            ...array.slice(fromIndex + 1, targetIndex),
            item,
            ...array.slice(targetIndex, length)
        ];
    }
    return array;
}
