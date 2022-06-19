/**
 * Moves an array item from one position in an array to another.
 * 
 * Note: This is a pure function so a new array will be returned, instead
 * of altering the array argument.
 * 
 * @param array (String) : Array in which to move an item. (required) 
 * @param moveIndex (Object) : The index of the item to move.          (required)
 * @param toIndex  (Object) : The index to move item at moveIndex to. (required)
 * @returns new updated array
 */
export function move<T>(array: T[], moveIndex: number, toIndex: number): T[] {
    const item = array[moveIndex];
    const length = array.length;
    const diff = moveIndex - toIndex;

    if (diff > 0) {
        // move left
        return [
            ...array.slice(0, toIndex),
            item,
            ...array.slice(toIndex, moveIndex),
            ...array.slice(moveIndex + 1, length)
        ];
    } else if (diff < 0) {
        // move right
        const targetIndex = toIndex + 1;
        return [
            ...array.slice(0, moveIndex),
            ...array.slice(moveIndex + 1, targetIndex),
            item,
            ...array.slice(targetIndex, length)
        ];
    }
    return array;
}