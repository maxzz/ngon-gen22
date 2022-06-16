export function isNonNull<T>(x: T): x is NonNullable<T> {
    return !!x;
}
