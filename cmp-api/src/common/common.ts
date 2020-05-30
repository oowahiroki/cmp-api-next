/**
 * Return true if object is not empty
 * @param object
 */
export function isObjectNotEmpty(object: object): boolean {
    return !(object === undefined || object === null || Object.keys(object).length === 0)
}

/**
 * Return true if array is not empty
 * @param array
 */
export function isArrayNotEmpty(array: Array<object>): boolean {
    return !(array === undefined || array === null || array.length === 0)
}

/**
 * Return true if array is not empty
 * @param value
 */
export const isStringNotEmpty = (value: string) => {
    return !(value === undefined || value === null || value.length === 0 || value.trim().length === 0)
}
