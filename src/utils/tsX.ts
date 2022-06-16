/**
 * This guard is designed to separate objects from null | undefined values.
 * This may not work correctly if the values 0 or the empty string are to 
 * be treated as true values.
 * 
 * Typical use case: 
 * 
 * replace array.map().filter(Boolean) with
 * array.map().filter(isNonNull).
 * @param x any
 * @returns boolean
 */
export function isNonNull<T>(x: T): x is NonNullable<T> {
    return !!x;
}
